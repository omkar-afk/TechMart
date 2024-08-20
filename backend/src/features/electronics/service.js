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

const getElectronicsByType = async (types,search) => {  
    try{
        types = [...Object.values(types)]
         search = escapeRegex(search); 
        const electronics = await db.electronics.find({type:{
            $in:types
        },name:{$regex:search,$options:'i'}});
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
    return await db.electronics.find({});
  }catch(e){
    throw new InternalServerError(e.message ||"Error creating electronic");
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

module.exports = {
    createElectronic,
    getElectronicsByType,
    getElectronicsBySuggestion,
    getElectronics
}