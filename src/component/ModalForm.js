// ModalForm.js
import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { width_device } from '../style/StyleGlobal';
import { ReqApiStudy } from '../endpoint/RequestApi';


// Validation schema
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const ModalForm = ({ visible, onClose, onSubmit, initialValues }) => {


  const handleFormSubmit = (values) => {
    onSubmit(values);
    onClose();
  };
  

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Contact Form</Text>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            // onSubmit={values => {onSubmit(values);onClose();}}
            onSubmit={handleFormSubmit}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View>
                <TextInput
                  color="black"
                  placeholderTextColor="grey"
                  style={styles.input}
                  placeholder="Name"
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={
                   
                    values.name
                }
                />
                {touched.name && errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
                <TextInput
                  color="black"
                  placeholderTextColor="grey"
                  style={styles.input}
                  placeholder="Email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={
                  
                    values.email
                  }
                />
                {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                <Button onPress={handleSubmit} style={{marginBottom:10, marginTop:5}} title="Submit" />
              </View>
            )}
          </Formik>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: (90 / 100) * width_device,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: (80 / 100) * width_device,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 15,
  },
  closeButtonText: {
    color: 'blue',
  },
});

export default ModalForm;
