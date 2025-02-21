import { LINKEDIN_REDIRECT_URI } from "./env";

export async function linkedInLogin() {
  window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=78alqpzulixtgq&redirect_uri=${LINKEDIN_REDIRECT_URI}&state=hard_to_guess_string&scope=openid%20profile%20email`
}