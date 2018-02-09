module.exports = [
  {
    _id: Math.round(Math.random() * 1000000),
    text: "You are officially rocking GiftedChat.",
    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    system: true,
  }, //tulisan abu2 yang gk ada di card box
  
  
];

const waitingBot = (text) => {
  return [
    {
      _id: 'WaitingBot',
      text: text,
      createdAt: new Date().getTime(),
      system: true
      
    }
  ]
}