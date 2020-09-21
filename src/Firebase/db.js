import { db } from "./firebase";

let DOC_NAME = "";
// user.email = "jashangill3592@gmail.com"

export const setUserDB = (docName, data) => {
  //

  DOC_NAME = docName;
  getUserdataDB(docName, (callReturn) => {
    if (!callReturn && callReturn !== "error") {
      // if user is not stored and no error has occurred
      db.collection("users")
        .doc(docName)
        .set(data)
        .then(() =>
          console.log("[Set User (DB)]", "The user is stored into Database")
        )
        .catch((err) => console.log("[Set User (DB)]", err.message));
    } else console.log("[Set User (DB)]", "The user is already in Database");
  });
};

export const getUserdataDB = (docName, callback, display) => {
  db.collection("users")
    .doc(docName)
    .get()
    .then((res) => {
      if (res.exists) {
        if (display) console.log("[Get User Data (DB)]", res.data());
        callback(res.data());
      } else {
        if (display)
          console.log(
            "[Get User Data (DB)]",
            "User cannot be found in Database"
          );
        callback(null);
      }
    })
    .catch((err) => {
      console.log("[Get User Data (DB)]", err);
      callback("error");
    });
};

export const getUserdataOnSnapashotDB = (docName, callback, display) => {
  db.collection("users")
    .doc(docName)
    .onSnapshot((res) => {
      if (res.exists) {
        if (display) console.log("[Get User Data (DB)]", res.data());
        callback(res.data());
      } else {
        if (display)
          console.log(
            "[Get User Data (DB)]",
            "User cannot be found in Database"
          );
        callback(null);
      }
    });
};

// Start of Add Product
//docName = user.email
export const addProduct = (docName, data, productName) => {
  getUserdataDB(docName, (callReturn) => {
    if (callReturn && callReturn !== "error") {
      const products = callReturn.products;
      let mergedObj;
      if (products.hasOwnProperty(productName)) {
        products[productName] += 1;
        mergedObj = products;
      } else
        mergedObj = {
          ...products,
          ...data,
        };

      let counter = 0;
      Object.values(mergedObj).forEach((num) => (counter += num));

      // Updating products in db
      updateProductInternalDB({
        products: mergedObj,
        totalProducts: counter,
      });
    }
  });
};
// End of Add Product

const updateProductInternalDB = (data) => {
  db.collection("users")
    .doc(DOC_NAME)
    .update(data)
    .then(() => {
      console.log("Product updated"); // Document updated
    })
    .catch((error) => {
      console.error("Error updating a product", error);
    });
};

export const updateProduct = (type, productName) => {
  getUserdataDB(
    DOC_NAME,
    (callReturn) => {
      if (callReturn && callReturn !== "error") {
        let productsObj = callReturn.products;
        let quantity = productsObj[productName];
        if (type === "add") quantity = quantity + 1;
        if (type === "remove") {
          quantity = quantity - 1; // CHANGE THIS
        }

        productsObj[productName] = quantity;

        if (quantity <= 0) delete productsObj[productName];

        let counter = 0;
        Object.values(productsObj).forEach((num) => (counter += num));

        console.log(counter);

        updateProductInternalDB({
          products: productsObj,
          totalProducts: counter,
        });
      }
    },
    false
  );
};
