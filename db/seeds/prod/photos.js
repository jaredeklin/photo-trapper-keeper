
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('photos').del()
    .then(function () {
      // Inserts seed entries
      return knex('photos').insert([
        { title: 'pic1', url: 'https://wallpaperbrowse.com/media/images/3848765-wallpaper-images-download.jpg' },
        { title: 'pic2', url: 'https://www.gettyimages.com/gi-resources/images/Embed/new/embed2.jpg' },
        { title: 'pic3', url: 'https://www.elastic.co/assets/bltada7771f270d08f6/enhanced-buzz-1492-1379411828-15.jpg' }
      ]);
    });
};
