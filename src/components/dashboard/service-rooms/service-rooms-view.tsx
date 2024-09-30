import React, { useState, useCallback, useMemo } from 'react';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Bed as BedIcon } from '@phosphor-icons/react/dist/ssr/Bed';
import { RoomAvailability, RoomAvailabilityByDate } from './types';
import { fetchRequest, HttpMethod } from "@/utils/fetch";
import { config } from "@/config";
import CircularProgress from "@mui/material/CircularProgress";

const tableCellStyles = { position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 1 };

const ServiceRoomsView: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [bookings, setBookings] = useState<RoomAvailabilityByDate[]>([]);
  const [loading, setLoading] = useState(false);

  const generateDays = useCallback(async () => {
    if (!startDate || !endDate) return;

    setLoading(true);
    const queryParams = `start=${startDate.toISOString().split('T')[0]}&end=${endDate.toISOString().split('T')[0]}`;
    const { data } = await fetchRequest<RoomAvailabilityByDate[]>(`${config.api.url}/booking?${queryParams}`, HttpMethod.GET);
    setBookings(data);
    setLoading(false);
  }, [startDate, endDate]);

  const updateRoomStatus = useCallback((rowIndex: number, roomIndex: number, updatedRoomAvailability: boolean) => {
    setBookings((prevBookings) => {
      const newBookings = [...prevBookings];
      newBookings[rowIndex] = {
        ...newBookings[rowIndex],
        rooms: newBookings[rowIndex].rooms.map((room, index) =>
          index === roomIndex ? { ...room, available: updatedRoomAvailability } : room
        ),
      };
      return newBookings;
    });
  }, []);

  const toggleRoomStatus = useCallback(async (bookingDate: string, room: RoomAvailability, rowIndex: number, roomIndex: number) => {
    const updatedRoomAvailability = !room.available;

    const endpoint = room.available ? HttpMethod.POST : HttpMethod.DELETE;
    const payload = { roomId: room.roomId, startDate: bookingDate, endDate: bookingDate };

    await fetchRequest<any>(`${config.api.url}/booking`, endpoint, payload);
    updateRoomStatus(rowIndex, roomIndex, updatedRoomAvailability);
  }, [updateRoomStatus]);

  const tableContent = useMemo(() => (
    <TableContainer component={Paper} style={{ maxHeight: '70vh' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={tableCellStyles}>Date</TableCell>
            {bookings[0]?.rooms.map((room) => (
              <TableCell key={room.roomId} sx={tableCellStyles}>{room.roomId}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map((booking, rowIndex) => (
            <TableRow key={rowIndex}>
              <TableCell>{booking.date}</TableCell>
              {booking.rooms.map((room, roomIndex) => (
                <TableCell key={roomIndex}>
                  <Button
                    variant="contained"
                    color="inherit"
                    sx={{
                      backgroundColor: room.available ? 'green' : 'red',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: room.available ? '#006400' : '#b30000',
                      },
                    }}
                    onClick={() => toggleRoomStatus(booking.date, room, rowIndex, roomIndex)}
                  >
                    <BedIcon fill="white" fontSize="var(--icon-fontSize-md)" weight="fill" />
                  </Button>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ), [bookings, toggleRoomStatus]);

  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box display="flex" gap="20px" mb="20px" alignItems="end">
          <DatePicker
            label="Start date"
            value={startDate}
            onChange={setStartDate}
            renderInput={(params) => <TextField {...params} />}
          />
          <DatePicker
            label="End date"
            value={endDate}
            onChange={setEndDate}
            renderInput={(params) => <TextField {...params} />}
          />
          <Button
            variant="contained"
            onClick={generateDays}
            disabled={!startDate || !endDate}
            sx={{
              height: '36px',
              padding: '6px 16px',
              backgroundColor: '#3f51b5',
              color: 'white',
              '&:hover': {
                backgroundColor: '#303f9f',
              },
            }}
          >
            Check availability
          </Button>
        </Box>
      </LocalizationProvider>
      {loading && <CircularProgress color="primary" />}
      {bookings.length > 0 && tableContent}
    </Box>
  );
};

export default ServiceRoomsView;
