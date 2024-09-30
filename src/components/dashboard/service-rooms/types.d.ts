
export type RoomAvailability = {
  roomId: string;
  available: boolean;
}

export type RoomAvailabilityByDate = {
  date: string;
  rooms: RoomAvailability[];
}
