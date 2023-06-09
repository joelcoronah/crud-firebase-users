import { Button, Stack } from "@mui/material";
import "./table.scss";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { getAllUsers, deleteUser, EditUser } from "../../axios/user";
import { useEffect, useState } from "react";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { registerRequest } from "../../axios/auth";
const TableUsers = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);

  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [title, setTitle] = useState("");

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 300 },
    { field: "lastName", headerName: "Last name", width: 125 },
    {
      field: "email",
      headerName: "Email",
      width: 300,
    },
  ];

  useEffect(() => {
    getAllUsers()
      .then((res) => {
        console.log("users", { res });
        setUsers(res.data.data.items);
      })
      .catch((error) => {
        console.error({ error });
      });
  }, []);

  const onButtonClick = (e, row, title) => {
    e.stopPropagation();
    if (row) {
      setUser(row);
      setEdit(true);
    } else {
      setEdit(false);
      setUser({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
    }
    handleClickOpen(title);
  };

  const onButtonDelete = (e, row) => {
    e.stopPropagation();
    setUser(row);
    handleClickOpenDelete("Borrar usuario");
  };

  const handleClickOpenDelete = (title) => {
    setOpenDelete(true);
    setTitle(title);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setOpen(false);
  };

  const handleClickOpen = (title) => {
    setOpen(true);
    setTitle(title);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenDelete(false);
  };

  const confirmDelete = () => {
    deleteUser(user.id)
      .then((res) => {
        console.log({ res });
        getAllUsers()
          .then((res) => {
            console.log("users", { res });
            setUsers(res.data.data.items);
          })
          .catch((error) => {
            console.error({ error });
          });
      })
      .catch((error) => {
        console.error({ error });
      });

    setOpenDelete(false);
  };

  const confirmEdit = () => {
    EditUser(user.id, user)
      .then((res) => {
        getAllUsers()
          .then((res) => {
            console.log("users", { res });
            setUsers(res.data.data.items);
          })
          .catch((error) => {
            console.error({ error });
          });
      })
      .catch((error) => {
        console.error({ error });
      });
    setOpen(false);
  };

  const saveUser = () => {
    registerRequest(user)
      .then((res) => {
        getAllUsers()
          .then((res) => {
            console.log("users", { res });
            setUsers(res.data.data.items);
          })
          .catch((error) => {
            console.error({ error });
          });
      })
      .catch((error) => {
        console.error({ error });
      });
    setOpen(false);
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <h1
        style={{
          color: "#555",
          fontWeight: "normal",
          marginLeft: 10,
        }}
      >
        Users List
      </h1>
      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          {user && (
            <DialogContentText>
              Are you sure you want to delete the user{" "}
              <strong>{user.firstName}</strong> ?
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={confirmDelete} variant="contained" color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="firstName"
            label="First name"
            type="text"
            fullWidth
            variant="standard"
            value={user.firstName}
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
          />
          <TextField
            autoFocus
            margin="dense"
            id="lastName"
            label="LastName"
            type="text"
            fullWidth
            variant="standard"
            value={user.lastName}
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          />
          {!edit && (
            <>
              <TextField
                autoFocus
                margin="dense"
                id="email"
                label="Email"
                type="text"
                fullWidth
                variant="standard"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
              <TextField
                autoFocus
                margin="dense"
                id="password"
                label="Password"
                type="password"
                fullWidth
                variant="standard"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={edit ? confirmEdit : saveUser}
            variant="contained"
            color="primary"
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "15px",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => onButtonClick(e, "", "Create User")}
        >
          Create User
        </Button>
      </div>

      <DataGrid
        rows={users}
        columns={[
          ...columns,
          {
            field: "actions",
            headerName: "Actions",
            width: 400,
            renderCell: (params) => {
              return (
                <>
                  <Stack spacing={2} direction="row">
                    <Button
                      onClick={(e) => onButtonDelete(e, params.row)}
                      variant="contained"
                      color="error"
                    >
                      <DeleteIcon />
                    </Button>
                    <Button
                      onClick={(e) => onButtonClick(e, params.row, "Edit User")}
                      variant="contained"
                    >
                      <EditIcon />
                    </Button>
                  </Stack>
                </>
              );
            },
          },
        ]}
        initialState={{
          pagination: {
            paginationModel: { pemail: 0, pemailSize: 5 },
          },
        }}
        pemailSizeOptions={[1, 5, 10]}
      />
    </div>
  );
};

export default TableUsers;
