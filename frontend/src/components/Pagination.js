import React, {     useState} from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
// import { useDispatch } from "react-redux";
// import { fetchProducts } from "../Reducers/Reducers";

function PaginatedComponent() {
  const [page, setPage] = useState(1);
//   const dispatch = useDispatch();
  const handleChange = (event, value) => {
    event.preventDefault(); // Prevent the default action
    setPage(value); // Update the page state
  }

//   useEffect(() => {
 
//     dispatch(fetchProducts());
//   },[dispatch]);
  return (
    <Stack spacing={2}>
      <Pagination
        count={5}
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
      />
    </Stack>
  );
}

export default PaginatedComponent;
