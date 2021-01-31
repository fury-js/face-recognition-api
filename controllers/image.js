const Clarifai = require('clarifai')

const app = new Clarifai.App({
    apiKey: 'b19e9285c33c4c4691086c478676f295'
  });

const handleApiCall = (req, res) => {
    app.models.predict( Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data=>{res.json(data)})
}




const handleImage = (req, res, db) => {
    const {id} = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
      res.json(entries[0]);
      // console.log(entries, 'handleImage')
  })
  .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}
