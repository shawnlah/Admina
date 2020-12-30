import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { KeyboardDatePicker } from '@material-ui/pickers';
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

export default function CreateUser() {
  const classes = useStyles();

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

  const handleDateChange = (date: Date | null) => {
    // TODO
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
              <form className={classes.form} noValidate>
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
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item sm>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="dd/MM/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Date Of Birth"
                      value={null}
                      onChange={handleDateChange}
                    // KeyboardButtonProps={{
                    //   'aria-label': 'change date',
                    // }}
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
                    />
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
                      value={IdentificationTypeEnum.NEW_IC}
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
                      value={UserRoleEnums.TEACHER}
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
                    />
                  </Grid>
                </Grid>
                <Button
                  variant="contained"
                  color="primary"
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
