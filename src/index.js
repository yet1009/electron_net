import {createRoot} from 'react-dom/client'
import UserList from "./pages/UserList";

const rootEl = document.getElementById('root');
const root = createRoot(rootEl);

const Home = () => {

    return (
        <UserList />
    )
}

root.render(
    <Home />
)



