import { useContext } from 'preact/hooks';
import { MyContext } from '../../store/context'

import { SET_LANGUAGE } from '../../store/actions'
function UserList() {
  const { dispatch } = useContext(MyContext);
  return (
    <ul>
      <li>
        <span>Vimalraj Selvam</span>
        <button
          type="button"
          onClick={() => dispatch({ type: SET_LANGUAGE, language: "enUS" })}
        >
          Edit
        </button>
      </li>

      {/* Removed for brevity */}
    </ul>
  );
}


export function AddGenderToUser() {
  const { store, dispatch } = useContext(MyContext);

  return (
    <div>
      <h2>Add gender to {store.username}</h2>
      <button
        type="button"
        onClick={() => dispatch({ type: SET_GENDER, gender: "??" })}
      >
        Add Age
      </button>
    </div>
  );
}

export default UserList
