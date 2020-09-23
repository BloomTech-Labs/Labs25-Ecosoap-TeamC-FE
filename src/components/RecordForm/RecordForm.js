import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useQuery, useMutation } from '@apollo/client';
import {
  GET_RECORDS,
  NEW_RECORD,
  UPDATE_RECORD,
  DELETE_RECORD,
} from '../records/RecordModification.js';
import { GET_TYPES } from '../types/TypeModification.js';
import { Modal } from 'react-responsive-modal';

import './RecordForm.css';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <KeyboardArrowUpIcon
                style={{ color: '#3BB54A', cursor: 'pointer' }}
              />
            ) : (
              <KeyboardArrowDownIcon
                style={{ color: '#3BB54A', cursor: 'pointer' }}
              />
            )}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="center">{row.type.name}</TableCell>
        <TableCell align="center">{row.coordinates.latitude}</TableCell>
        <TableCell align="center">{row.coordinates.longitude}</TableCell>
        <TableCell align="center">
          <EditIcon
            style={{ color: '#3BB54A', cursor: 'pointer' }}
            onClick={() => {
              props.setRecordUpdateData(row);
              props.onOpenUpdateModal();
            }}
          />
          &nbsp;&nbsp;&nbsp;
          <DeleteIcon
            style={{ color: '#C84E47', cursor: 'pointer' }}
            onClick={() => {
              props.setDeleteRecordData(row.id);
              props.onOpenDeleteModal();
            }}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              {/* <Typography variant="h5" gutterBottom component="div">
                Field Data
              </Typography> */}
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow style={{ background: '#deffde' }}>
                    <TableCell>NAME</TableCell>
                    <TableCell>VALUE</TableCell>
                    <TableCell colSpan="3">ACTIONS</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.fields.map((field, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {field.name}
                      </TableCell>
                      <TableCell>{field.value}</TableCell>
                      <TableCell>
                        <EditIcon
                          style={{ color: '#3BB54A', cursor: 'pointer' }}
                          onClick={() => console.log('inside editIcon')}
                        />
                        &nbsp;&nbsp;&nbsp;
                        <DeleteIcon
                          style={{ color: '#C84E47', cursor: 'pointer' }}
                          onClick={() => console.log('inside DELETE ICON!')}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const RecordForm = () => {
  const { loading, error, data } = useQuery(GET_RECORDS);

  /*-------------- Table Pagination Functionality START --------------*/
  const pages = [10, 15, 25];
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(pages[page]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  /*-------------- Table Pagination Functionality END --------------*/

  const [openAdd, setOpenAdd] = useState(false);
  const [recordData, setRecordData] = useState({
    name: '',
    typeId: '',
    coordinates: { latitude: 0, longitude: 0 },
    fields: [],
  });

  const [openUpdate, setOpenUpdate] = useState(false);
  const [recordUpdateData, setRecordUpdateData] = useState({
    id: '',
    name: '',
    coordinates: { latitude: 0, longitude: 0 },
    fields: [],
  });

  const [openDelete, setOpenDelete] = useState(false);
  const [deleteRecordData, setDeleteRecordData] = useState({
    id: '',
  });

  // Opens Add Record Modal
  const onOpenAddModal = () => {
    setOpenAdd(true);
  };

  // Closes Add Record Modal
  const onCloseAddModal = () => {
    setOpenAdd(false);
  };

  // Opens Update Record Modal
  const onOpenUpdateModal = () => {
    setOpenUpdate(true);
  };

  // Closes Update Record Modal
  const onCloseUpdateModal = () => {
    setOpenUpdate(false);
  };

  // Opens Delete Record Modal
  const onOpenDeleteModal = () => {
    setOpenDelete(true);
  };

  // Closes Delete Record Modal
  const onCloseDeleteModal = () => {
    setOpenDelete(false);
  };

  const handleChange = event => {
    setRecordData({
      ...recordData,
      [event.target.name]: event.target.value,
    });
  };
  // Handles changes for Latitude specifically
  const handleLatitudeChange = event => {
    setRecordData({
      ...recordData,
      coordinates: {
        latitude: parseFloat(event.target.value),
        longitude: parseFloat(recordData.coordinates.longitude),
      },
      fields: [],
    });
  };
  // Handles changes for Longitude specifically
  const handleLongitudeChange = event => {
    setRecordData({
      ...recordData,
      coordinates: {
        latitude: parseFloat(recordData.coordinates.latitude),
        longitude: parseFloat(event.target.value),
      },
      fields: [],
    });
  };

  const handleUpdateChange = event => {
    console.log('Record Update Data: ', recordUpdateData);
    setRecordUpdateData({
      ...recordUpdateData,
      [event.target.name]: event.target.value,
    });
  };
  // Handles changes for updating Latitude specifically
  const handleLatitudeUpdateChange = event => {
    setRecordUpdateData({
      ...recordUpdateData,
      coordinates: {
        latitude: parseFloat(event.target.value),
        longitude: parseFloat(recordUpdateData.coordinates.longitude),
      },
      fields: [],
    });
  };
  // Handles changes for updating Longitude specifically
  const handleLongitudeUpdateChange = event => {
    setRecordUpdateData({
      ...recordUpdateData,
      coordinates: {
        latitude: parseFloat(recordUpdateData.coordinates.latitude),
        longitude: parseFloat(event.target.value),
      },
      fields: [],
    });
  };

  const onAddSubmit = e => {
    e.preventDefault();
    registerNewRecord({
      variables: {
        name: recordData.name,
        typeId: recordData.typeId,
        coordinates: recordData.coordinates,
        fields: [],
      },
    });
    onCloseAddModal();
  };

  const onUpdateSubmit = e => {
    e.preventDefault();
    console.log('THIS IS recordUpdateData', recordUpdateData);
    updateRecord({
      variables: {
        id: recordUpdateData.id,
        name: recordUpdateData.name,
        coordinates: {
          latitude: recordUpdateData.coordinates.latitude,
          longitude: recordUpdateData.coordinates.longitude,
        },
        fields: [],
      },
    });
    onCloseUpdateModal();
  };

  const onDeleteSubmit = e => {
    e.preventDefault();
    deleteRecord({
      variables: { id: deleteRecordData },
    });
    onCloseDeleteModal();
  };

  const { data: queryData } = useQuery(GET_TYPES);

  const [registerNewRecord, { mutData }] = useMutation(NEW_RECORD, {
    refetchQueries: ['getRecords'],
  });
  const [updateRecord, { mutData2 }] = useMutation(UPDATE_RECORD, {
    refetchQueries: ['getRecords'],
  });
  const [deleteRecord, { mutData3 }] = useMutation(DELETE_RECORD, {
    refetchQueries: ['getRecords'],
  });

  return (
    <>
      <div className="recordFormDiv">
        {loading && <p>Loading...</p>}
        {error && (
          <p>We're experiencing errors with the API! Please come back later.</p>
        )}
        <h1>Map Management</h1>
        <button onClick={e => onOpenAddModal()} className="newRecordButton">
          ADD RECORD
        </button>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell style={{ fontWeight: '900' }}>NAME</TableCell>
                <TableCell align="center" style={{ fontWeight: '900' }}>
                  TYPE
                </TableCell>
                <TableCell align="center" style={{ fontWeight: '900' }}>
                  LATITUDE&nbsp;
                </TableCell>
                <TableCell align="center" style={{ fontWeight: '900' }}>
                  LONGITUDE&nbsp;
                </TableCell>
                <TableCell style={{ fontWeight: '900' }} colSpan="2">
                  ACTIONS&nbsp;
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.records
                  .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                  .map(row => (
                    <Row
                      onOpenUpdateModal={onOpenUpdateModal}
                      onOpenDeleteModal={onOpenDeleteModal}
                      key={row.id}
                      row={row}
                      setDeleteRecordData={setDeleteRecordData}
                      setRecordUpdateData={setRecordUpdateData}
                    />
                  ))}
            </TableBody>
            <TablePagination
              page={page}
              rowsPerPageOptions={pages}
              rowsPerPage={rowsPerPage}
              count={data && data.records.length}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Table>
        </TableContainer>

        {/* Modal for adding a new record */}
        <Modal open={openAdd} onClose={onCloseAddModal} center>
          <form
            className="waypointAddForm"
            onSubmit={e => {
              onAddSubmit(e);
            }}
          >
            <h2 className="title" style={{ marginTop: '10px' }}>
              Add Record
            </h2>
            <div className="addRecordLabeldiv">
              <label className="FirstAddInput">
                <span>Name:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <input
                  placeholder="Location Name"
                  type="text"
                  name="name"
                  onChange={event => handleChange(event)}
                />
              </label>
              <label className="FirstAddInput">
                <span>Type:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <select
                  className="dropdown"
                  name="typeId"
                  onChange={event => handleChange(event)}
                >
                  <option label="Select a type:" />
                  {queryData &&
                    queryData.types.map(({ id, name }) => (
                      <option value={id}>{name}</option>
                    ))}
                </select>
              </label>
              <label className="FirstAddInput">
                <span>Latitude:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <input
                  placeholder="Latitude"
                  type="float"
                  name="latitude"
                  onChange={event => handleLatitudeChange(event)}
                />
              </label>
              <label className="FirstAddInput">
                <span>Longitude:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <input
                  placeholder="Longitude"
                  type="float"
                  name="longitude"
                  onChange={event => handleLongitudeChange(event)}
                />
              </label>
            </div>
            <button className="addWaypointButton" type="submit">
              {' '}
              Submit new location
            </button>
          </form>
        </Modal>

        {/* Modal for updating a record */}
        <Modal open={openUpdate} onClose={onCloseUpdateModal} center>
          <form
            className="waypointUpdateForm"
            onSubmit={e => {
              onUpdateSubmit(e);
            }}
          >
            <h2 className="title" style={{ marginTop: '10px' }}>
              Update Record
            </h2>
            <label className="FirstUpdateInput">
              <span>Name:&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <input
                placeholder="Location Name"
                type="text"
                name="name"
                value={recordUpdateData.name}
                onChange={event => handleUpdateChange(event)}
              />
            </label>
            <label className="FirstUpdateInput">
              <span>Latitude:&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <input
                placeholder="Latitude"
                type="text"
                name="latitude"
                value={recordUpdateData.coordinates.latitude}
                onChange={event => handleLatitudeUpdateChange(event)}
              />
            </label>
            <label className="FirstUpdateInput">
              <span>Longitude:&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <input
                placeholder="Longitude"
                type="text"
                name="longitude"
                value={recordUpdateData.coordinates.longitude}
                onChange={event => handleLongitudeUpdateChange(event)}
              />
            </label>
            <button className="updateWaypointButton" type="submit">
              {' '}
              Update Record
            </button>
          </form>
        </Modal>

        {/* Modal for deleting a record */}
        <Modal open={openDelete} onClose={onCloseDeleteModal} center>
          <form
            className="record-modal"
            onSubmit={e => {
              onDeleteSubmit(e);
            }}
          >
            <h3 className="title">Delete Record</h3>
            <h1>Are you sure you want to delete this record?</h1>
            <button className="y-n-del-button" id="yesButton" type="submit">
              Yes
            </button>
            <button className="y-n-del-button">No</button>
          </form>
        </Modal>
      </div>
    </>
  );
};

export default RecordForm;
