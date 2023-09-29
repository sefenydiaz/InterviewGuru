export const addUser = `mutation AddUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      token
      user {
        _id
        name
        email
        password
      }
    }
  }`;

export const login = `mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
        email
        password
      }
    }
  }`;

export const allUsers = `query AllUsers {
    allUsers {
      _id
      email
      name
      password
    }
  }`;

export const findUserById = `query FindUserById($findUserByIdId: String!) {
    findUserById(id: $findUserByIdId) {
      _id
      name
      email
      password
    }
  }`;

export const deleteUser = `mutation DeleteUser($id: String!) {
    deleteUser(_id: $id) {
      _id
      name
      email
      password
    }
  }`;
