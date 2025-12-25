import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;


export const postData = async (url,formData) => {
    try {
        const response = await fetch(apiUrl + url, {
            method: "POST",
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type': `application/json`
            },
            body:JSON.stringify(formData)
        })
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            const errorData = await response.json();
            return errorData;
        }
    } catch (error) {
        console.log(error)
    }
}

export const fetchData = async (url) => {
    try {
        const {data} = await axios.get(apiUrl + url, {
             headers:{
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
        })
        return data;
        
    } catch (error) {
        console.log(error)
        return error;
    }
}

export const putData = async (url, formData) => {
  try {
    const response = await fetch(apiUrl + url, {
      method: "PUT",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const deleteData = async (url, formData) => {
  try {
    const response = await fetch(apiUrl + url, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const uploadImage = async (url, formData) => {
  try {
    const response = await fetch(apiUrl + url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: formData, 
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const deleteImage = async (url) => {
  try {
    const response = await fetch(apiUrl + url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
