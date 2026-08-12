![Banner](https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop)

# 🌎 Global Restaurant & Food Delivery Intelligence (GRFDI)
**The "ImageNet" of Food Delivery & Restaurant Analytics**

[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)
![Dataset Size](https://img.shields.io/badge/Size-3.5MB-blue.svg)
![Format](https://img.shields.io/badge/Format-CSV-green.svg)
![Upvote](https://img.shields.io/badge/Kaggle-Upvote_This_Dataset!-orange.svg)

*Comprehensive, relational, and highly-engineered data spanning restaurants, dynamic pricing, nutritional info, and logistics across major global hubs like NYC, London, and Tokyo.*

---

### 🔼 If you find this dataset useful for your portfolio, research, or learning, please leave an **UPVOTE**! It helps the community discover high-quality relational datasets. 🔼

---

## 🚀 Why This Dataset Exists
Most Kaggle datasets are single, flat CSV files containing scraped, biased, or messy data. **GRFDI is different.** 
Built from the ground up for the modern ML community, this dataset is a robust, 11-table relational database that simulates true real-world enterprise architectures. It provides a legally clean, PII-free foundation for complex Data Science and Business Intelligence tasks.

---

## 🗺️ Global Reach
We didn't just focus on one city. This dataset captures the economic diversity of the globe:
- **North America**: New York City, Los Angeles (High urban density, premium delivery fees)
- **Europe**: London, Manchester (Varying cost of living and cuisine diversity)
- **Asia**: Tokyo, Osaka, Mumbai, Delhi (Hyper-dense logistics, high volume, dynamic peak multipliers)
- **South America**: Sao Paulo, Rio de Janeiro (Emerging market dynamics, unique price histories)

---

## 📊 What Can You Build? (Suggested Benchmarks)

This dataset naturally supports multiple ML and BI disciplines:

1. **⏱️ ETA Prediction (Tabular Regression)**: Predict `Average_delivery_time` using distance bounds, weather zones, and peak multipliers.
2. **📈 Price Forecasting (Time-Series)**: Use `price_history.csv` to forecast future menu inflation across different regions.
3. **🎯 Recommendation Engines (Clustering)**: Cluster restaurants based on binary amenities (`restaurant_features.csv`) and macronutrient ratios (`nutrition.csv`).
4. **🧠 RAG & AI Agents**: Build a semantic search tool to find "Wheelchair accessible, High-Protein vegan food under $15 in London with fast delivery."
5. **🏢 Business Intelligence**: Write complex SQL JOINs to uncover the "Average delivery fee for Italian restaurants operating in High-Income countries."

---

## 🗄️ Relational Schema Breakdown

The repository contains 11 cleanly linked CSVs:
- **`countries.csv`** & **`cities.csv`**: Macro-economic anchors (Population, GDP groupings, Weather zones).
- **`cuisines.csv`**: Hierarchical global food taxonomy.
- **`restaurants.csv`**: Core metadata (Coordinates, Ratings, Status).
- **`restaurant_features.csv`**: 13 boolean amenities (WiFi, Pet-friendly, Halal).
- **`menus.csv`** & **`nutrition.csv`**: Granular itemization (Price, Calories, Protein, Fat).
- **`price_history.csv`**: Temporal pricing updates.
- **`delivery_metrics.csv`**: Logistics data (ETA, Service fees, Peak multipliers).
- **`restaurant_statistics.csv`** & **`city_statistics.csv`**: Aggregated performance metrics for rapid dashboarding.

---

## 🛠️ Data Quality & Generation
This dataset was synthetically engineered to mirror exact real-world statistical bounds. It underwent rigorous automated testing to guarantee:
- 100% Referential Integrity (No orphaned IDs across tables).
- Zero Geographic Outliers (Coordinates bound to realistic global spheres).
- Zero Nutritional Logic Errors (e.g., Vegan items strictly contain zero animal macronutrients).
- Zero Copyright/Terms of Service violations.

---

### Ready to dive in? Create a new Notebook and start exploring!
Don't forget to ❤️ **Upvote** to support open, high-quality relational datasets!
