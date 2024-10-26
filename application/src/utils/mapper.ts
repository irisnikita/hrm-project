export function mapUser(user: any) {
  return {
    ...user,
    createdAt: user.created_at,
    updatedAt: user.updated_at,
  };
}
