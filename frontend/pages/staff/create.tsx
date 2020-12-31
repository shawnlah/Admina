import React, { FormEvent, useState } from "react";
import { Avatar, Button, CssBaseline, TextField, TextareaAutosize, Paper, Grid, Typography, makeStyles, Select, MenuItem } from '@material-ui/core'
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'
import logger from 'loglevel'
import NavBar from '../../components/navbar'
import { IdentificationTypeEnum, IdentificationTypes, UserRoleEnums, UserRoles } from "../../interfaces/user";


const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(img/wallpaper2-min.PNG)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    paddingTop: "40px",
  },
  paper: {
    margin: theme.spacing(8, 8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  idTypeSelect: {
    padding: "8px",
    paddingTop: "4.1%"
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface CreateStaffForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  identificationType: IdentificationTypeEnum;
  identification: string;
  role: UserRoleEnums.ADMIN | UserRoleEnums.TEACHER;
  position: string;
  additionalInfo: string;
}

export default function CreateUser() {
  const classes = useStyles();

  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: null,
    identificationType: IdentificationTypeEnum.NEW_IC,
    identification: '',
    role: UserRoleEnums.TEACHER,
    position: '',
    additionalInfo: ''
  } as CreateStaffForm)

  const IdSelectComponent = () => {
    const idTypesComponent = []
    for (const idType of Object.values(IdentificationTypeEnum)) {
      idTypesComponent.push(<MenuItem key={idType} value={idType}>{IdentificationTypes.get(idType)}</MenuItem>)
    }
    return idTypesComponent
  }

  const RoleSelectComponent = () => {
    const rolesComponent = []
    for (const role of [UserRoleEnums.ADMIN, UserRoleEnums.TEACHER]) {
      rolesComponent.push(<MenuItem key={role} value={role}>{UserRoles.get(role)}</MenuItem>)
    }
    return rolesComponent
  }

  const handleSubmit = (e: FormEvent) => {
    logger.info("Form submission triggered", state)
    e.preventDefault()
  }

  const CreateUserForm = () => {
    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid container justify="center" className={classes.image}>
          <Grid
            item
            xs={12}
            sm={10}
            component={Paper}
            elevation={6}
            square
          >
            <Grid className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Create New Staff
              </Typography>
              <form className={classes.form} onSubmit={handleSubmit} noValidate>
                <Grid container spacing={2}>
                  <Grid item sm>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="First Name"
                      id="first-name"
                      name="first-name"
                      autoComplete="first-name"
                      autoFocus
                      autoCapitalize='on'
                      value={state.firstName}
                      onChange={(e) => setState({ ...state, firstName: e.target.value })}
                    />
                  </Grid>
                  <Grid item sm>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Last Name"
                      name="last-name"
                      id="last-name"
                      autoComplete="last-name"
                      autoFocus
                      autoCapitalize='on'
                      value={state.lastName}
                      onChange={(e) => setState({ ...state, lastName: e.target.value })}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item sm>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Email"
                      id="email"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      value={state.email}
                      onChange={(e) => setState({ ...state, email: e.target.value })}
                    />
                  </Grid>
                  <Grid item sm>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Phone Number"
                      name="phone-number"
                      id="phone-number"
                      autoComplete="phone-number"
                      autoFocus
                      value={state.phone}
                      onChange={(e) => setState({ ...state, phone: e.target.value })}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item sm>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Date Of Birth"
                        value={state.dateOfBirth}
                        onChange={(date) => setState({ ...state, dateOfBirth: date })}
                      // KeyboardButtonProps={{
                      //   'aria-label': 'change date',
                      // }}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid sm className={classes.idTypeSelect}>
                    <Select
                      required
                      fullWidth
                      label="Identification Type"
                      id="identification-type"
                      name="identification-type"
                      value={state.identificationType}
                      onChange={(e) => setState({ ...state, identificationType: e.target.value as IdentificationTypeEnum })}
                    >
                      {IdSelectComponent()}
                    </Select>
                  </Grid>
                  <Grid item sm>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Identification"
                      name="identification"
                      id="identification"
                      autoComplete="identification"
                      autoFocus
                      value={state.identification}
                      onChange={(e) => setState({ ...state, identification: e.target.value })}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid sm className={classes.idTypeSelect}>
                    <Select
                      required
                      fullWidth
                      label="Role"
                      id="role"
                      name="role"
                      value={state.role}
                      onChange={(e) => setState({ ...state, role: e.target.value as UserRoleEnums.ADMIN | UserRoleEnums.TEACHER })}
                    >
                      {RoleSelectComponent()}
                    </Select>
                  </Grid>
                  <Grid item sm>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Title of Position"
                      name="position"
                      id="position"
                      autoComplete="position"
                      autoFocus
                      autoCapitalize='on'
                      value={state.position}
                      onChange={(e) => setState({ ...state, position: e.target.value })}
                    />
                  </Grid>
                </Grid>
                <Grid item sm>
                  <TextareaAutosize
                    aria-label="Additional Info"
                    rowsMin={5}
                    name="additional-info"
                    id="additional-info"
                    placeholder="Additional Info"
                    value={state.additionalInfo}
                    onChange={(e) => setState({ ...state, additionalInfo: e.target.value })}
                  />
                </Grid>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className={classes.submit}
                >
                  Create
                </Button>
              </form>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }

  return (
    <NavBar mainContent={CreateUserForm()} />
  );
}
