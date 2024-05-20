import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import StudentModel from './Models/Student.js';
import BillModel from './Models/Bill.js';
import UserProfileModel from './Models/UserProfile.js';  // Import the UserProfile model
import BillBabysitterGirlModel from './Models/billbabysittergirl.js';


import babysittergirlModel from './Models/babysittergirl.js';
const port = 3001;
const app = express();

app.use(cors());
app.use(express.json());
const mongoURL ="mongodb+srv://sum:123@cluster0.jaggkgl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoURL)
  .then(() => console.log("Connected to the database"))
  .catch(err => console.error("Database connection error:", err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Student routes
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const student = await StudentModel.findOne({ studusername: username, password: password });

    if (student) {
      res.send({ success: true, message: 'Login successful', role: student.studrole });
    } else {
      res.send({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
});

app.post('/addStudent', async (req, res) => {
  const student = new StudentModel({
    studId: req.body.id,
    studName: req.body.name,
    studrole: 'normal',
    studusername: req.body.username,
    password: req.body.password,
    gender: req.body.gender,
  });

  try {
    await student.save();
    res.send('Document saved successfully');
  } catch (error) {
    console.error('Error saving document:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.put('/updateStudent/:id', async (req, res) => {
  const studIdToUpdate = req.params.id;

  try {
    const existingStudent = await StudentModel.findOne({ studId: studIdToUpdate });

    if (!existingStudent) {
      return res.status(404).send({ message: 'Student not found' });
    }

    existingStudent.studName = req.body.name;
    existingStudent.studrole = req.body.role;
    existingStudent.studusername = req.body.username;
    existingStudent.password = req.body.password;

    await existingStudent.save();

    res.send({ message: 'Student information updated successfully' });
  } catch (error) {
    console.error('Error updating student information:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

app.get('/getAllStudents', async (req, res) => {
  try {
    const students = await StudentModel.find();
    const count = await StudentModel.countDocuments({});
    res.send({ students, count });
  } catch (error) {
    console.error('Error retrieving students:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

app.get('/getStudent/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const student = await StudentModel.find({ studId: id });
    res.send({ student });
  } catch (error) {
    console.error('Error retrieving student:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

app.delete('/deleteStudent/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const existingStudent = await StudentModel.findOne({ studId: id });

    if (!existingStudent) {
      return res.status(404).send({ message: 'Student not found' });
    }

    await StudentModel.deleteOne({ studId: id });

    res.send({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});



app.post('/addbabysittergirl', async (req, res) => {
  const babysittergirl = new babysittergirlModel({
    babysitterid: req.body.id,
    babysitterName: req.body.name,
    babysitterAge: req.body.age,
    babysitterPrice: req.body.price,
    babysitterPlace: req.body.place,
    babysitterHouseno: req.body.houseno,
  });

  try {
    await babysittergirl.save();
    res.send('Document saved successfully');
  } catch (error) {
    console.error('Error saving document:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.put('/updatebabysittergirl/:id', async (req, res) => {
  const babysitteridToUpdate = req.params.id;

  try {
    const existingbabysittergirl = await babysittergirlModel.findOne({ babysitterid: babysitteridToUpdate });

    if (!existingbabysittergirl) {
      return res.status(404).send({ message: 'Babysitter girl not found' });
    }

    // Update each field individually and handle validation errors
    if (req.body.babysitterName) {
      existingbabysittergirl.babysitterName = req.body.babysitterName;
    }
    if (req.body.babysitterAge) {
      existingbabysittergirl.babysitterAge = req.body.babysitterAge;
    }
    if (req.body.babysitterPrice) {
      existingbabysittergirl.babysitterPrice = req.body.babysitterPrice;
    }
    if (req.body.babysitterPlace) {
      existingbabysittergirl.babysitterPlace = req.body.babysitterPlace;
    }
    if (req.body.babysitterHouseno) {
      existingbabysittergirl.babysitterHouseno = req.body.babysitterHouseno;
    }

    // Save the updated document
    await existingbabysittergirl.save();

    res.send({ message: 'Babysitter girl information updated successfully' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      // Extract specific validation errors for each field
      const errors = {};
      for (let field in error.errors) {
        errors[field] = error.errors[field].message;
      }
      return res.status(400).send({ message: 'Validation failed', errors });
    }
    console.error('Error updating babysitter girl information:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});


app.get('/getAllbabysittergirls', async (req, res) => {
  try {
    const babysittergirls = await babysittergirlModel.find();
    const count = await babysittergirlModel.countDocuments({});
    res.send({ babysittergirls, count });
  } catch (error) {
    console.error('Error retrieving babysittergirls:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

app.get('/getbabysittergirl/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const babysittergirl = await babysittergirlModel.find({ babysitterid: id });
    res.send({ babysittergirl });
  } catch (error) {
    console.error('Error retrieving babysittergirl:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

/*
app.delete('/deletebabysittergirl/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const existingbabysittergirl = await babysittergirlModel.findOne({ babysitterid: id });

    if (!existingbabysittergirl) {
      return res.status(404).send({ message: 'babysittergirl not found' });
    }

    await babysittergirlModel.deleteOne({ babysitterid: id });

    res.send({ message: 'babysittergirl deleted successfully' });
  } catch (error) {
    console.error('Error deleting babysittergirl:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});
*/

app.delete('/deletebabysittergirl/:id', async (req, res) => {
  const id = req.params.id;

  try {
    // Check if the babysitter girl exists
    const existingbabysittergirl = await babysittergirlModel.findOne({ babysitterid: id });

    if (!existingbabysittergirl) {
      return res.status(404).send({ message: 'Babysitter girl not found' });
    }

    // Delete the babysitter girl
    await babysittergirlModel.deleteOne({ babysitterid: id });

    res.send({ message: 'Babysitter girl deleted successfully' });
  } catch (error) {
    console.error('Error deleting babysitter girl:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});




// the bill for chose babysitter


app.post('/addbillbabysittergirl', async (req, res) => {
  const billbabysittergirl = new BillBabysitterGirlModel({
    babysitterid: req.body.babysitterid,
    babysitterName: req.body.babysitterName,
    customerforbabysitterName: req.body.customerforbabysitterName,
    customerforbabysitterPhone: req.body.customerforbabysitterPhone,
    babysitterAge: req.body.babysitterAge,
    babysitterPrice: req.body.babysitterPrice,
    babysitterPlace: req.body.babysitterPlace,
    babysitterHouseno: req.body.babysitterHouseno,
    date: req.body.babysitterDate, // Corrected field
    paymentMethod: req.body.babysitterPaymentMethod, // Corrected field
    cardNo: req.body.babysitterCardno,
    cardDay: req.body.babysitterCardday,
    cardCvv: req.body.babysitterCardcvv,
  });

  try {
    await billbabysittergirl.save();
    res.send('Document saved successfully');
  } catch (error) {
    console.error('Error saving document:', error);
    res.status(500).send('Internal Server Error');
  }
});



app.get('/getallbillbabysittergirls', async (req, res) => {
  try {
    const allBillBabysitters = await BillBabysitterGirlModel.find();
    res.json(allBillBabysitters);
  } catch (error) {
    console.error('Error fetching bill babysitter records:', error);
    res.status(500).send('Internal Server Error');
  }
});







// UserProfile routes
app.post('/addUserProfile', async (req, res) => {
  const userProfile = new UserProfileModel({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    pic: req.body.pic,
  });

  try {
    await userProfile.save();
    res.send('User profile saved successfully');
  } catch (error) {
    console.error('Error saving user profile:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.put('/updateUserProfile/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const existingUserProfile = await UserProfileModel.findById(id);

    if (!existingUserProfile) {
      return res.status(404).send({ message: 'User profile not found' });
    }

    existingUserProfile.name = req.body.name;
    existingUserProfile.email = req.body.email;
    existingUserProfile.password = req.body.password;
    existingUserProfile.pic = req.body.pic;

    await existingUserProfile.save();

    res.send({ message: 'User profile updated successfully' });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

app.get('/getAllUserProfiles', async (req, res) => {
  try {
    const userProfiles = await UserProfileModel.find();
    const count = await UserProfileModel.countDocuments({});
    res.send({ userProfiles, count });
  } catch (error) {
    console.error('Error retrieving user profiles:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

app.get('/getUserProfile/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const userProfile = await UserProfileModel.findById(id);
    res.send({ userProfile });
  } catch (error) {
    console.error('Error retrieving user profile:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

app.delete('/deleteUserProfile/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const existingUserProfile = await UserProfileModel.findById(id);

    if (!existingUserProfile) {
      return res.status(404).send({ message: 'User profile not found' });
    }

    await UserProfileModel.deleteOne({ _id: id });

    res.send({ message: 'User profile deleted successfully' });
  } catch (error) {
    console.error('Error deleting user profile:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});
