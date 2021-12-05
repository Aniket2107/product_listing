import React from "react";

const brands = ["PETER ENGLAND", "ELEPANTS"];

const sizes = ["S", "M", "L", "XL"];

const Filter = ({
  sortByPrice,
  sortValue,
  handleChange,
  selectedSize,
  selectedBrands,
  gender,
}: any) => {
  return (
    <div>
      <div>
        <label htmlFor="price">Sort by price</label>
        <select
          id="price"
          value={sortValue}
          onChange={(e) => sortByPrice(e.target.value)}
          className="input"
        >
          <option value="D">Default</option>
          <option value="L">Low to High</option>
          <option value="H">High to Low</option>
        </select>
      </div>

      <div>
        <label htmlFor="isFor">Gender</label>
        <select
          id="isFor"
          value={gender}
          onChange={(e) => handleChange("filterByGender", e.target.value)}
          className="input"
        >
          Gender
          <option value="A">All</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>
      </div>

      <div className="mt-4">
        <label htmlFor="brands">Brands</label>
        <div className="checkbox">
          {brands.map((brand) => {
            return (
              <React.Fragment key={brand}>
                <input
                  type="checkbox"
                  checked={selectedBrands.indexOf(brand) === -1 ? false : true}
                  onChange={(e) =>
                    handleChange("filterByBrands", brand, e.target.checked)
                  }
                />
                <span>{brand}</span>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="sizes">Size</label>
        <div className="checkbox">
          {sizes.map((size) => {
            return (
              <React.Fragment key={size}>
                <input
                  type="checkbox"
                  checked={selectedSize.indexOf(size) === -1 ? false : true}
                  onChange={(e) =>
                    handleChange("filterBySizes", size, e.target.checked)
                  }
                />
                <span>{size}</span>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <p onClick={() => handleChange("clearFilter")} className="cp u">
        Clear filter
      </p>
    </div>
  );
};

export default Filter;
