// Placeholder fraud reports controller

exports.getFraudReports = async (req, res) => {
  try {
    // Return mock fraud reports data
    const fraudReports = [
      {
        id: '1',
        type: 'Spam',
        description: 'Multiple spam job postings detected',
        reportedAt: new Date().toISOString()
      },
      {
        id: '2',
        type: 'Fraud',
        description: 'Fake candidate profiles detected',
        reportedAt: new Date().toISOString()
      }
    ];
    res.json(fraudReports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
