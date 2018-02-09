
const summaryBot = (title) => {
  return [
    {
      _id: Math.round(Math.random() * 1000000),
      text: `Terima kasih telah membaca artikel ${title}, silahkan berikan rangkumannya di sini`,
      createdAt: new Date().getTime(),
      user: {
        _id: 2,
        name: 'Reading Habit',
      },
    },
    
    
  ]
}

module.exports = {
  summaryBot
}