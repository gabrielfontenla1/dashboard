
export interface RoomAvailability {
  roomId: string;
  available: boolean;
}

export interface RoomAvailabilityByDate {
  date: string;
  rooms: RoomAvailability[];
}
export interface BookingResponse {success: boolean, data: RoomAvailabilityByDate[]}
