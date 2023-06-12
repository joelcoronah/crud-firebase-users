import { Alert, Button, IconButton, Snackbar, Stack } from "@mui/material";
import "./table.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { getAllUsers, deleteUser, EditUser } from "../../axios/user";
import React, { useEffect, useState } from "react";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { registerRequest } from "../../axios/auth";
import CloseIcon from "@mui/icons-material/Close";

const TableUsers = () => {
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

  const [page, setPage] = useState(0);
  const [error, setError] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  });
  const [pageSize, setPageSize] = useState(5);
  const [rowCount, setRowCount] = useState(0);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [message, setMessage] = useState("Notification");
  const [severity, setSeverity] = useState("success");

  useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);
      getAllUsers(page + 1, pageSize)
        .then((res) => {
          console.log("users", { res });
          setRows(res.data.data.items);
          setRowCount(res.data.data.count);
        })
        .catch((error) => {
          console.error({ error });
        });

      if (!active) {
        return;
      }

      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [page, pageSize]);

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
    setError({
      firstName: false,
      email: false,
      lastName: false,
      password: false,
    });
  };

  const confirmDelete = () => {
    deleteUser(user.id)
      .then((res) => {
        console.log({ res });
        getAllUsers()
          .then((res) => {
            console.log("users", { res });
            setRows(res.data.data.items);
            setRowCount(res.data.data.count);
            handleClickSnackBar("Deleted User Successfully", "success");
          })
          .catch((error) => {
            handleClickSnackBar("Delete Error, try again", "error");
            console.error({ error });
          });
      })
      .catch((error) => {
        console.error({ error });
      });

    setOpenDelete(false);
  };

  const confirmEdit = (e) => {
    e.preventDefault();

    if (user.firstName === "" || user.lastName === "") {
      Object.keys(user).forEach((key) => {
        if (user[key] === "") {
          setError({ ...error, [key]: true });
        }
      });
      handleClickSnackBar("Error, please fill the fields", "error");
      return;
    }

    EditUser(user.id, user)
      .then((res) => {
        getAllUsers()
          .then((res) => {
            console.log("users", { res });
            setRows(res.data.data.items);
            setRowCount(res.data.data.count);
            handleClickSnackBar("Updated User Successfully", "success");
          })
          .catch((error) => {
            handleClickSnackBar("Update Error, try again", "error");
            console.error({ error });
          });
      })
      .catch((error) => {
        console.error({ error });
      });
    setOpen(false);
  };

  const saveUser = (e) => {
    e.preventDefault();

    if (
      user.email === "" ||
      user.password === "" ||
      user.firstName === "" ||
      user.lastName === ""
    ) {
      Object.keys(user).forEach((key) => {
        if (user[key] === "") {
          setError({ ...error, [key]: true });
        }
      });
      handleClickSnackBar("Error, please fill the fields", "error");
      return;
    }

    registerRequest(user)
      .then((res) => {
        getAllUsers()
          .then((res) => {
            console.log("users", { res });
            setRows(res.data.data.items);
            setRowCount(res.data.data.count);
            handleClickSnackBar("Created User Successfully", "success");
          })
          .catch((error) => {
            handleClickSnackBar("Create Error, try again", "error");
            console.error({ error });
          });
        setOpen(false);
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  const handlePaginationChange = (params, e) => {
    setPage(params.page);
    setPageSize(params.pageSize);
  };

  const handleClickSnackBar = (message, severity) => {
    setOpenSnackBar(true);
    setMessage(message);
    setSeverity(severity);
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleCloseSnackBar}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

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
            error={error.firstName}
            required
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
            error={error.lastName}
            required
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
                error={error.email}
                autoFocus
                required
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
                error={error.password}
                margin="dense"
                required
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
      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
        severity={severity}
        action={action}
      >
        <Alert
          onClose={handleCloseSnackBar}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>

      <DataGrid
        slots={{ toolbar: GridToolbar }}
        autoHeight
        rows={rows}
        pagination={true}
        pageSize={5}
        pageSizeOptions={[5, 10, 20]}
        paginationModel={{ page, pageSize }}
        onPaginationModelChange={handlePaginationChange}
        rowCount={rowCount || 0}
        paginationMode="server"
        onPageChange={(newPage) => setPage(newPage)}
        loading={loading}
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
      />
    </div>
  );
};

export default TableUsers;
