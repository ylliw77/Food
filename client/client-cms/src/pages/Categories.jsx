import { useEffect, useState } from "react";
import axios from "../config";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  
  
  const fetchCategory = async () => {
    try {
      const { data } = await axios({
        method : "GET",
        data : categories,
        url : "/categories",
        headers : {
          Authorization : "Bearer " + localStorage.getItem("access_token")
        }
      });
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <>
    <table className="table table-hover">
        <thead>
            <tr>
                <th>Category</th>
            </tr>
        </thead>
        <tbody>
            {
                categories.map(el => {
                    return <tr key={el.id} >
                        <td>{el?.name || ""}</td>
                    </tr>
                })
            }
        </tbody>
    </table>
    </>
  )
};

export default CategoryPage;
