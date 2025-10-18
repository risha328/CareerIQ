from flask import Flask, request, jsonify
from flask_cors import CORS
import nltk
from nltk.corpus import stopwords
import PyPDF2
import docx
import os
import json
import tempfile
from datetime import datetime
import re
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

# Download NLTK data
nltk.download('stopwords')
nltk.download('punkt')

# Sample job data (in production, this would come from a database)
SAMPLE_JOBS = [
    {
        'id': '1',
        'title': 'Software Engineer',
        'company': 'Tech Corp',
        'description': 'Develop software applications using Python, JavaScript, and React. Experience with databases and APIs required.',
        'required_skills': ['Python', 'JavaScript', 'React', 'SQL', 'REST APIs', 'Git']
    },
    {
        'id': '2',
        'title': 'Data Scientist',
        'company': 'Data Inc',
        'description': 'Analyze data using machine learning techniques. Python, R, and statistical analysis experience needed.',
        'required_skills': ['Python', 'R', 'Machine Learning', 'Statistics', 'Pandas', 'NumPy']
    },
    {
        'id': '3',
        'title': 'Full Stack Developer',
        'company': 'Web Solutions',
        'description': 'Build web applications using modern technologies. Frontend and backend development experience.',
        'required_skills': ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Express', 'HTML', 'CSS']
    }
]

def extract_text_from_pdf(file_path):
    """Extract text from PDF file"""
    text = ""
    try:
        with open(file_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            print(f"PDF has {len(pdf_reader.pages)} pages")
            for i, page in enumerate(pdf_reader.pages):
                try:
                    page_text = page.extract_text()
                    text += page_text + "\n"
                    print(f"Page {i+1} extracted {len(page_text)} characters")
                except Exception as page_error:
                    print(f"Error extracting page {i+1}: {page_error}")
                    continue
    except Exception as pdf_error:
        print(f"PDF reading error: {pdf_error}")
        # Fallback: try to read as plain text if it's not a real PDF
        try:
            with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                text = f.read()
                print("Fallback: read as plain text")
        except:
            raise pdf_error
    return text

def extract_text_from_docx(file_path):
    """Extract text from DOCX file"""
    doc = docx.Document(file_path)
    text = ""
    for paragraph in doc.paragraphs:
        text += paragraph.text + "\n"
    return text

def extract_skills(text):
    """Extract skills from resume text using regex and keyword matching"""
    # Common technical skills - expanded list
    technical_skills = [
        # Programming Languages
        'python', 'javascript', 'java', 'c++', 'c#', 'php', 'ruby', 'go', 'rust', 'typescript', 'swift', 'kotlin',
        # Web Technologies
        'react', 'angular', 'vue', 'node.js', 'express', 'django', 'flask', 'spring', 'laravel',
        'html', 'css', 'sass', 'scss', 'bootstrap', 'tailwind', 'jquery',
        # Databases
        'sql', 'mysql', 'postgresql', 'mongodb', 'redis', 'elasticsearch', 'oracle', 'sqlite',
        # Cloud & DevOps
        'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'jenkins', 'git', 'github', 'gitlab', 'bitbucket',
        'terraform', 'ansible', 'puppet', 'chef', 'nginx', 'apache',
        # Data Science & ML
        'machine learning', 'deep learning', 'tensorflow', 'pytorch', 'scikit-learn', 'pandas', 'numpy',
        'matplotlib', 'seaborn', 'jupyter', 'spark', 'hadoop', 'kafka',
        # Mobile
        'android', 'ios', 'react native', 'flutter', 'xamarin',
        # Other
        'agile', 'scrum', 'kanban', 'jira', 'confluence', 'slack', 'trello',
        'linux', 'windows', 'macos', 'bash', 'powershell', 'rest api', 'graphql'
    ]

    found_skills = []
    text_lower = text.lower()

    for skill in technical_skills:
        if skill in text_lower:
            found_skills.append(skill.title())

    # Extract additional skills using regex patterns
    skill_patterns = [
        r'\b(react\.js|reactjs)\b',
        r'\b(node\.js|nodejs)\b',
        r'\b(express\.js|expressjs)\b',
        r'\b(mongo\s*db)\b',
        r'\b(postgre\s*sql)\b',
        r'\b(machine\s*learning)\b',
        r'\b(deep\s*learning)\b',
        r'\b(data\s*science)\b',
        r'\b(artificial\s*intelligence)\b',
        r'\b(api|rest\s*api)\b',
        r'\b(frontend|front-end)\b',
        r'\b(backend|back-end)\b',
        r'\b(full\s*stack)\b'
    ]

    for pattern in skill_patterns:
        matches = re.findall(pattern, text_lower, re.IGNORECASE)
        for match in matches:
            found_skills.append(match.title())

    return list(set(found_skills))  # Remove duplicates

def extract_experience(text):
    """Extract work experience from resume"""
    experiences = []
    lines = text.split('\n')

    # Look for experience section and extract relevant lines
    in_experience_section = False
    for line in lines:
        line = line.strip()
        if not line:
            continue

        # Check if we're entering experience section
        if any(keyword in line.lower() for keyword in ['experience', 'work history', 'employment', 'professional experience']):
            in_experience_section = True
            continue

        # Check if we're entering another section (stop collecting experience)
        if in_experience_section and any(keyword in line.lower() for keyword in ['education', 'skills', 'projects', 'certifications']):
            break

        # Collect experience lines
        if in_experience_section and len(line) > 5:
            # Look for job titles, companies, dates
            if any(indicator in line.lower() for indicator in ['engineer', 'developer', 'manager', 'analyst', 'consultant', 'specialist', 'lead', 'senior', 'junior', 'intern']):
                experiences.append(line)
            elif any(company_indicator in line.lower() for company_indicator in ['ltd', 'inc', 'corp', 'llc', 'company', 'technologies', 'solutions', 'systems']):
                experiences.append(line)
            elif re.search(r'\b(20\d{2}|19\d{2})\b', line):  # Date patterns
                experiences.append(line)

    # If no structured experience found, look for any lines with job-related keywords
    if not experiences:
        for line in lines:
            line = line.strip()
            if len(line) > 10 and any(keyword in line.lower() for keyword in ['worked', 'developed', 'managed', 'led', 'created', 'built']):
                experiences.append(line)

    return list(set(experiences))[:5]  # Remove duplicates and return top 5

def extract_education(text):
    """Extract education from resume"""
    education = []
    lines = text.split('\n')

    # Look for education section and extract relevant lines
    in_education_section = False
    for line in lines:
        line = line.strip()
        if not line:
            continue

        # Check if we're entering education section
        if any(keyword in line.lower() for keyword in ['education', 'academic', 'qualification', 'degree']):
            in_education_section = True
            continue

        # Check if we're entering another section (stop collecting education)
        if in_education_section and any(keyword in line.lower() for keyword in ['experience', 'skills', 'projects', 'certifications']):
            break

        # Collect education lines
        if in_education_section and len(line) > 5:
            # Look for degrees, universities, institutions
            if any(degree in line.lower() for degree in ['bachelor', 'master', 'phd', 'doctorate', 'associate', 'diploma', 'certificate']):
                education.append(line)
            elif any(institution in line.lower() for institution in ['university', 'college', 'institute', 'school', 'academy']):
                education.append(line)
            elif re.search(r'\b(20\d{2}|19\d{2})\b', line):  # Graduation years
                education.append(line)

    # If no structured education found, look for degree mentions
    if not education:
        for line in lines:
            line = line.strip()
            if len(line) > 10 and any(keyword in line.lower() for keyword in ['bachelor', 'master', 'phd', 'degree', 'university', 'college']):
                education.append(line)

    return list(set(education))[:3]  # Remove duplicates and return top 3

def calculate_match_score(candidate_skills, job_skills):
    """Calculate match score between candidate skills and job requirements"""
    if not candidate_skills or not job_skills:
        return 0

    candidate_skills_lower = [skill.lower() for skill in candidate_skills]
    job_skills_lower = [skill.lower() for skill in job_skills]

    matches = set(candidate_skills_lower) & set(job_skills_lower)
    score = (len(matches) / len(job_skills_lower)) * 100

    return round(score, 2)

@app.route('/parse-resume', methods=['POST'])
def parse_resume():
    """Parse resume and extract skills, experience, education"""
    try:
        print("Received parse-resume request")
        print("Files in request:", list(request.files.keys()))

        if 'file' not in request.files:
            print("No 'file' key in request.files")
            return jsonify({'error': 'No file provided'}), 400

        file = request.files['file']
        print("File object:", file)
        print("Filename:", file.filename)

        if file.filename == '':
            print("Empty filename")
            return jsonify({'error': 'No file selected'}), 400

        # Save file temporarily using secure filename
        filename = secure_filename(file.filename)
        temp_dir = tempfile.gettempdir()
        file_path = os.path.join(temp_dir, filename)
        print("Saving to temp path:", file_path)

        file.save(file_path)
        print("File saved, checking if exists:", os.path.exists(file_path))

        # Check file size
        file_size = os.path.getsize(file_path)
        print("File size:", file_size)

        # Extract text based on file type
        if file.filename.lower().endswith('.pdf'):
            print("Processing as PDF")
            text = extract_text_from_pdf(file_path)
        elif file.filename.lower().endswith(('.docx', '.doc')):
            print("Processing as DOCX")
            text = extract_text_from_docx(file_path)
        else:
            print("Unsupported file format:", file.filename)
            return jsonify({'error': 'Unsupported file format'}), 400

        print("Extracted text length:", len(text))

        # Extract information
        skills = extract_skills(text)
        experience = extract_experience(text)
        education = extract_education(text)

        print("Extracted skills:", skills)

        # Clean up
        os.remove(file_path)
        print("Temp file cleaned up")

        result = {
            'skills': skills,
            'experience': experience,
            'education': education,
            'parsed_at': datetime.utcnow().isoformat()
        }

        print("Returning result")
        return jsonify(result), 200

    except Exception as e:
        print("Exception in parse-resume:", str(e))
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/job-matches', methods=['POST'])
def get_job_matches():
    """Get job matches based on candidate skills"""
    try:
        data = request.get_json()
        candidate_skills = data.get('skills', [])

        if not candidate_skills:
            return jsonify({'error': 'No skills provided'}), 400

        matches = []
        for job in SAMPLE_JOBS:
            score = calculate_match_score(candidate_skills, job['required_skills'])
            if score > 30:  # Only include matches above 30%
                matches.append({
                    'job_id': job['id'],
                    'job_title': job['title'],
                    'company': job['company'],
                    'match_score': score,
                    'required_skills': job['required_skills'],
                    'matching_skills': list(set(candidate_skills) & set(job['required_skills']))
                })

        # Sort by match score
        matches.sort(key=lambda x: x['match_score'], reverse=True)

        return jsonify({'matches': matches[:10]}), 200  # Return top 10 matches

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'service': 'ai-service'}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=6999, debug=True)
