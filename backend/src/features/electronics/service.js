const db = require('../../utils/db');
const {InternalServerError} = require('../../utils/apiResponse');
const e = require('express');

const createElectronic = async (payload) => {
    try{
        const electronic = await db.electronics.create(payload);
        return electronic;
    }catch(e){
        throw new InternalServerError(e.message ||"Error creating electronic");
    }
   
}

//get image and electronics based on electronics id
const getElectronicsById = async (id) => {
  try {
    const images = await db.images.find({ electronicId: id }).lean();
    console.log("images", images);
    const electronic = await db.electronics.findById(id).populate("owner").lean();
    return { ...electronic, images };
  }
  catch (e) {
    throw new InternalServerError(e.message || "Error creating electronic");
  }
}

const getElectronicsByType = async (types,search) => {  
    try{
        types = [...Object.values(types)]
         search = escapeRegex(search); 
        const electronics = await db.electronics.find({type:{
            $in:types
        },name:{$regex:search,$options:'i'}}).lean();
        const promisesAll = electronics.map((electronic) => db.images.find({ electronicId: electronic._id }).limit(1));
        const images = await Promise.all(promisesAll);
        electronics.forEach((electronic) => {
          electronic.images = images.find((image) => image[0].electronicId.toString() === electronic._id.toString())[0];
        });
        return electronics;
    }catch(e){
        throw new InternalServerError(e.message ||"Error creating electronic");
    }
}

const escapeRegex = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const getElectronics = async()=>{
  try{
    const imagesData = await db.images.find().populate({
      path: 'electronicId',
      match: { status: 'available' }
    });
    const myMap = new Map();
    // console.log("images", imagesData);
    
    imagesData.forEach(image => {
      if (!myMap.has(image.electronicId)) {
        myMap.set(image.electronicId, [{ url: image.url,_id:image._id }]);
      }
    });
    //traverse the map
    let images = [];
    for (let [key, value] of myMap) {
      if(key != null){
      let electronic = key.toObject();
      electronic.images = value[0];
      images.push(electronic);
      }
    } 
return images;
  }catch(e){
    throw new InternalServerError(e.message ||"Error creating electronic");
  }
}

//get electronics by owner (customer id)
const getElectronicsByOwner = async (owner) => {
  try {
    const electronics = await db.electronics.find({ owner }).lean();
    //get images for each electronic
    const allPromises = electronics.map((electronic) => 
      db.images.find({ electronicId: electronic._id }).lean());
    
    const images = await Promise.all(allPromises);
    // console.log("images", images);  
    electronics.forEach((electronic) => {
      electronic.images = images.find((image) => image[0].electronicId.toString() === electronic._id.toString())[0];
    }
    );
    console.log("electronics", electronics);
    return electronics;
  } catch (e) {
    throw new InternalServerError(e.message || "Error creating electronic");
  }
};

//change electronic status
const updateStatus = async (id) => {
  try {

    const electronic = await db.electronics.findOneAndUpdate({_id:id}, { status: "Sold" });
    return electronic;
  } catch (e) {
    throw new InternalServerError(e.message || "Error creating electronic");
  }
}

const autocomplete = async (search) => {
  const escapedSearch = escapeRegex(search);
  const regex = new RegExp(`\\b${escapedSearch}`, 'i');

  // Fetch relevant documents
  const documents = await db.electronics.find({ name: regex });

  console.log("Matching documents:", documents.map(doc => doc.name));

  // Process documents to extract words and phrases
  const termCounts = {};
  documents.forEach(doc => {
    const words = doc.name.toLowerCase().split(/\s+/);
    const processedTerms = new Set();
    
    // Function to process a term
    const processTerm = (term) => {
      if (term.startsWith(search.toLowerCase()) && !processedTerms.has(term)) {
        termCounts[term] = (termCounts[term] || 0) + 1;
        processedTerms.add(term);
        console.log(`Processing "${term}" from "${doc.name}"`);
      }
    };

    // Process individual words and phrases
    for (let i = 0; i < words.length; i++) {
      let phrase = words[i];
      processTerm(phrase);
      for (let j = i + 1; j < words.length; j++) {
        phrase += ' ' + words[j];
        processTerm(phrase);
      }
    }
  });

console.log("Term counts:", termCounts);
  // Convert to array and sort
  const suggestions = Object.entries(termCounts)
    .map(([term, count]) => ({
      suggestion: term,
      count,
      isPhrase: term.includes(' ')
    }))
    .sort((a, b) => b.count - a.count || a.suggestion.localeCompare(b.suggestion))
    .slice(0, 10);

  console.log("Final suggestions:", suggestions);

  return suggestions;
};

const getElectronicsBySuggestion = async (search) => {
  try {
    search = escapeRegex(search);
    return await autocomplete(search);
  } catch (e) {
    console.error(e);
    throw new InternalServerError(e.message ||"Error creating electronic"); 
  }
};

//delete the electronic record
const deleteElectronic = async (id) => {
  try {
    const electronic = await db.electronics.findByIdAndDelete({_id:id});
    return electronic;
  } catch (e) {
    throw new InternalServerError(e.message || "Error creating electronic");
  }
};
const postAdd = async (req) => {
  try {
    let payload = req.body;
    let { images, ...main } = payload;
    console.log("payload", main);

    // Create the electronic record first
    const electronic = await db.electronics.create(main);
    console.log("-------------------");

    // Update images to be objects with the required structure
    images = images.map((image) => ({
      url: image, // assuming image is currently a string representing the URL
      electronicId: electronic._id,
    }));

    console.log("images", images);
    console.log(db.images);

    // Save all images to the database
    await Promise.all(images.map((image) => db.images.create(image)));
    console.log("images---------------");

    return { "status": "completed" };
  } catch (e) {
    console.error(e);
    throw new InternalServerError(e.message || "Error creating electronic");
  }
};

module.exports = {
    createElectronic,
    getElectronicsByType,
    getElectronicsBySuggestion,
    getElectronics,
    postAdd,
    getElectronicsById,
    getElectronicsByOwner,
    updateStatus,
    deleteElectronic
}