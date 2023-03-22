import React, { useState } from "react";
const [selectedCategory, setSelectedCategory] = useState("");
const [selectedBrand, setSelectedBrand] = useState("");
const [selectedDate, setSelectedDate] = useState("");

const handleCategoryChange = (event) => {
  setSelectedCategory(event.target.value);
};

const handleBrandChange = (event) => {
  setSelectedBrand(event.target.value);
};

const handleDateChange = (date) => {
  setSelectedDate(date);
};

const filteredData = data.filter((item) => {
  let filtered = true;
  if (selectedCategory && selectedCategory !== "All") {
    filtered = filtered && item.category === selectedCategory;
  }
  if (selectedBrand && selectedBrand !== "All") {
    filtered = filtered && item.brand === selectedBrand;
  }
  if (selectedDate) {
    const itemDate = new Date(item.date);
    filtered =
      filtered &&
      itemDate.getDate() === selectedDate.getDate() &&
      itemDate.getMonth() === selectedDate.getMonth() &&
      itemDate.getFullYear() === selectedDate.getFullYear();
  }
  return filtered;
});

const cardList = filteredData.map((item) => {
  return <Card key={item.id} data={item} />;
});

export default function Filtered() {
  return (
    <div>
      <div>
        <FilterForm
          categories={categories}
          brands={brands}
          onCategoryChange={handleCategoryChange}
          onBrandChange={handleBrandChange}
          onDateChange={handleDateChange}
        />
        <div className="card-grid">{cardList}</div>
      </div>
    </div>
  );
}
