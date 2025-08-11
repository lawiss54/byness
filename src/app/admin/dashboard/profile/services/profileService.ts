export async function changePhone(data: any) {
  const res = await fetch("/api/profile/change-phone", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  return res;
}

export async function changePassword(data: any) {
  const res = await fetch("/api/profile/change-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  return res;
}