import axios from 'axios';


// Axios instance with default settings
const apiClient = axios.create({
  baseURL: 'https://exercisedb.p.rapidapi.com',
  headers: {
    'x-rapidapi-key': "9a0e7e6bcbmsh9f188f74462db09p1ffce4jsn40a9c56da7cb",
    'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
  },
});

// Fetch exercises based on the body part
export const fetchExerciseBodyParts = async (bodyPart:string) => {
  try {
    const response = await apiClient.get(`/exercises/bodyPart/${bodyPart}`);
    return response.data;
  } catch (error:any) {
    console.error('Error fetching exercises:', error.message);
    throw error; // Re-throw the error for handling in the component
  }
};
