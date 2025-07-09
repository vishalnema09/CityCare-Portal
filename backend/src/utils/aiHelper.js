// utils/aiHelpers.js

export function detectCategoryAndPriority(description) {
    description = description.toLowerCase();
  
    const categories = {
      "Road Issue": ["pothole", "road broken", "road block", "speed breaker"],
      "Water Issue": ["leakage", "water", "pipe burst", "sewage"],
      "Electricity Issue": ["electricity", "power cut", "short circuit", "transformer"],
      "Garbage Issue": ["garbage", "waste", "dirty", "trash", "litter"],
      "Street Light Issue": ["street light", "lamp post", "no light"],
    };
  
    const highPriorityKeywords = ["urgent", "accident", "dangerous", "fire", "flood", "fell"];
    const mediumPriorityKeywords = ["pothole", "sewage", "leakage", "broken"];
  
    let detectedCategory = "Other";
    let detectedPriority = "Low";
  
    // Category Detection
    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => description.includes(keyword))) {
        detectedCategory = category;
        break;
      }
    }
  
    // Priority Detection
    if (highPriorityKeywords.some(keyword => description.includes(keyword))) {
      detectedPriority = "High";
    } else if (mediumPriorityKeywords.some(keyword => description.includes(keyword))) {
      detectedPriority = "Medium";
    }
  
    return { detectedCategory, detectedPriority };
  }
  

  