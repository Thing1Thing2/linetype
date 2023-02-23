# LineType

## Description
LineType’s mission is to streamline the interior design and construction process through the introduction of an integrated ecosystem. 
<br>
<br>
The platform consists of (1) 2D and 3D models, (2) Furniture and Material map information.
<br><br>
This project is built on top of React JS. 
<br>
It uses firebase storage and firebase database.


## Installation

Before running this project, please set up the configuration variables in ./src/firebase.js.
<br>
Use `npm start` to run the project.


## Usage

### Landing Page:
![Landing page](./src/images/ReadMe/landingPage.png "Title")

### Explore Page:
- Click on the product name to see the [Product Page](#product-page)
- Click on the download link to download the model file for that product
- Add the product to a schedule by choosing a schedule from the dropdown box, also specify quantity of the product to be added to the schedule
![Landing page](./src/images/ReadMe/explorePage.png "Title")
*Sample explore page*

### Product Page
- Shows details of the product
- Download button for the product model
![Landing page](./src/images/ReadMe/SampleProduct.png "Title")
*Sample product page*

### Add Product Page
- Navigate here for the navbar
- Model files can be of type .dwg, .stl, .3ds, .obj, or .skp
- Choose an existing supplier or go to [Add Supplier Page](#add-supplier-page) to add a new supplier
![Landing page](./src/images/ReadMe/AddProduct.png "Title")
*Add product page*

### Add Supplier Page
- Add all details of the new supplier
- The form will be rejected if supplier with given name already exists in the database
![Landing page](./src/images/ReadMe/AddSupplier.png "Title")
*Add supplier page*

### Schedules Page
- View all schedules created here
- Create a new schedule with description using the form below the page title (with a name that does not already exist in the database)
- Click on see details for to see the [Schedule Page](#schedule-page)
![Landing page](./src/images/ReadMe/mySchedules.png "Title")
*Sample schedules page*

### Schedule Page
- This page shows a schedule with the products and quantities added to it
![Landing page](./src/images/ReadMe/ScheduleSample.png "Title")
*Sample schedule page*

## License

copyright @LineType

