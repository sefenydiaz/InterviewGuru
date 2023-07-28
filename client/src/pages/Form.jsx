import { useState } from 'react';

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
  Input
} from '@chakra-ui/react'


const Form = () => {
 //store form input values
 const [formData, setFormData] = useState({
  industry: '',
  role: '',
  experience: '',
 })

 const handleInputChange = (event) => {
  const { name, value } = event.target;
  setFormData({ ...formData, [name]: value });
 }

 const handleFormSubmit = (event) => {
  event.preventDefault();
  console.log('Form data submitted: ', formData)
 }
  return(
    <div>
      <form onSubmit={handleFormSubmit}>
        <FormControl id="industry" isRequired>
          <FormLabel>Industry</FormLabel>
            <Select 
              placeholder='Select Industry'  
              onChange={handleInputChange} 
              name='industry'
              value={formData.industry}
              >
              <option>Technology</option>
              <option>Healthcare</option>
              <option>Finance</option>
              <option>Education</option>
              <option>Retail</option>
              <option>Manufactoring</option>
              <option>Energy</option>
              <option>Media & Entertainment</option>
              <option>Government & Public Services</option>
            </Select>
        </FormControl>
        <FormControl id="role" isRequired>
          <FormLabel>Role</FormLabel>
            <Input 
              placeholder='Role' 
              onChange={handleInputChange}
              name='role'
              value={formData.role}
            />
        </FormControl>
        <FormControl id="experience" isRequired>
          <FormLabel>Experience</FormLabel>
            <Select 
              placeholder='Select Experience Level'  
              onChange={handleInputChange} 
              name='experience'
              value={formData.experience}
              >
              <option>Internship</option>
              <option>Entry Level</option>
              <option>Associate</option>
              <option>Senior</option>
              <option>Director</option>
              <option>Executive</option>
            </Select>
        </FormControl>
      </form>
    </div>
    )


}



export default Form;
