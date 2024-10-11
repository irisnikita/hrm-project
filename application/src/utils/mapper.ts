// Types
import { User } from '@clerk/nextjs/server';
import { CreateUserDto } from '@/schemas/User';

/**
 * Maps a Clerk User object to a CreateUserDto object.
 *
 * @param {User} clerkUser - The Clerk User object to be mapped.
 * @returns {CreateUserDto} The mapped CreateUserDto object.
 *
 * @description
 * This function takes a Clerk User object and extracts relevant information
 * to create a CreateUserDto object. It includes the following mappings:
 * - userId: Clerk user's id
 * - username: Clerk user's username
 * - email: Primary email address of the Clerk user
 * - avatar: User's image URL
 * - role: Set to a default value of 3
 * - blocked: Set to false
 * - confirmed: Set to true
 * - fullName, firstName, lastName: Corresponding Clerk user properties
 * - password: Set to a default value of "abcd123456"
 * - primaryEmailAddress: Clerk user's primary email address object
 */
export function mapClerkUserToCreateUserDto(clerkUser: User): CreateUserDto {
  const {
    username,
    id,
    primaryEmailAddress,
    fullName,
    firstName,
    lastName,
    imageUrl: avatar,
  } = clerkUser;

  return {
    userId: id,
    username: username ?? primaryEmailAddress?.emailAddress ?? '',
    email: primaryEmailAddress?.emailAddress ?? '',
    avatar,
    role: 3,
    imageUrl: avatar,
    blocked: false,
    confirmed: true,
    fullName,
    firstName,
    lastName,
    password: 'abcd123456',
    primaryEmailAddress,
  };
}
