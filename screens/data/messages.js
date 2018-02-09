module.exports = [
  {
    _id: Math.round(Math.random() * 1000000),
    text: 'Hei, Selamat datang di Reabit App, mau baca apa hari ini?',
    createdAt: new Date().getTime(),
    user: {
      _id: 2,
      name: 'Reading Habit',
    },
  },
  
  
];
