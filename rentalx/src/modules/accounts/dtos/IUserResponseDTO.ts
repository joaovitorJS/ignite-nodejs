interface IUserResponseDTO {
  email: string;
  avatar: string;
  id: string;
  driver_license: string;
  name: string;
  avatar_url(): string;
}

export { IUserResponseDTO };
