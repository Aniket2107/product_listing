import { useEffect, useState } from "react";
import "./App.css";
import Filter from "./components/Filter";
import Navbar from "./components/Navbar";
import Product from "./components/Product";

import { dummyData } from "./data/dummyData";

export type ProductType = {
  id: number;
  name: string;
  description: string;
  price: number;
  isFor: string;
  size: string[];
  brand: string;
  img: string;
};

type Products = ProductType[];

function App() {
  const [products, setProducts] = useState<Products>(dummyData);
  const [filteredData, setFilteredData] = useState<Products>(dummyData);
  const [sortValue, setSortValue] = useState("D"); // D-> default / L-> Low to high / H->high to low
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string[]>([]);
  const [gender, setGender] = useState("A"); // A->All / M->Men / F->Women

  useEffect(() => {
    filterData();
  }, [gender, selectedSize, selectedBrands]);

  const sortByPrice = (val: string) => {
    if (val !== "D") {
      const newProducts = filteredData.sort((a, b) =>
        val === "L" ? a.price - b.price : b.price - a.price
      );

      setFilteredData(newProducts);
    } else {
      const newProducts = filteredData.sort((a, b) => a.id - b.id);

      setFilteredData(newProducts);
    }
    setSortValue(val);
  };

  const filterData = () => {
    if (!products) return;

    let tempProducts = [...products];

    if (gender === "M" || gender === "F") {
      tempProducts = tempProducts.filter((product) =>
        product.isFor.includes(gender)
      );
    } else if (gender === "A") {
      tempProducts = products;
    }

    if (selectedBrands.length > 0) {
      tempProducts = tempProducts.filter((product) =>
        selectedBrands.includes(product.brand)
      );
    }

    if (selectedSize.length > 0) {
      tempProducts = tempProducts.filter((product) =>
        product.size.some((size) => selectedSize.includes(size))
      );
    }

    setFilteredData(tempProducts);
  };

  const handleChange = (type: string, val: string, isChecked: boolean) => {
    if (type === "sortByPrice") {
      sortByPrice(val);
    } else if (type === "filterByBrands") {
      const isExists = selectedBrands.indexOf(val);
      const newArr = [...selectedBrands];

      if (isExists === -1 && isChecked) {
        newArr.push(val);
      } else {
        newArr.splice(isExists, 1);
      }

      setSelectedBrands(newArr);
    } else if (type === "filterBySizes") {
      const isExists = selectedSize.indexOf(val);
      const newArr = [...selectedSize];

      if (isExists === -1 && isChecked) {
        newArr.push(val);
      } else {
        newArr.splice(isExists, 1);
      }

      setSelectedSize(newArr);
    }
    if (type === "filterByGender") {
      setGender(val);
    } else if (type === "clearFilter") {
      setSelectedBrands([]);
      setSelectedSize([]);
      setGender("A"); //All
      setFilteredData(products);
    }
  };

  if (products.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="App">
      <Navbar />
      <div className="flex">
        <div className="filter">
          <Filter
            sortByPrice={sortByPrice}
            sortValue={sortValue}
            handleChange={handleChange}
            gender={gender}
            selectedSize={selectedSize}
            selectedBrands={selectedBrands}
          />
        </div>

        <div className="products">
          {filteredData?.length > 0 ? (
            filteredData.map((product) => (
              <Product product={product} key={product.id} />
            ))
          ) : (
            <p>Sorry no products found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
