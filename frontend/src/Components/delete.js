import axios from "axios";

export async function Delete(notename, history) {
    try {
        await axios.delete(`http://localhost:8000/note/${notename}`);
        console.log('Note Deleted Successfully');
        history("/"); 
    } catch (error) {
        console.log('Error Note Deleting')
        console.log(error);
    }
}
