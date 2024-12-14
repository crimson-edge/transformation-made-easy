import type { APIRoute } from 'astro';

const MAILERLITE_API_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiNWJjNjlhN2M3ZjM1ZWMxNzExZDMwZDNhYTI2MzVhNjYzNmI0MjY4ZmNhYTJiMDI5ZWEyOTdiYWIyOTBlNzM2NWJmYWM0NjlmZGVmOTc0ZTAiLCJpYXQiOjE3MzQyMTEwOTIuMjA5MTc0LCJuYmYiOjE3MzQyMTEwOTIuMjA5MTc2LCJleHAiOjQ4ODk4ODQ2OTIuMjA0OTUzLCJzdWIiOiIxMjQ1MTkwIiwic2NvcGVzIjpbXX0.KyxCMNd-RyxtpjBX9DLJTAbZd-I2EJ0LbXl5RdtY-7kmqrgzp5kb9Iz2eZCotILb2d_5wvBuoNHG6PhIaKw88zPTeNQJDTAAHeNS8xxv11pw9AEaEcisJqQG8ngsfoXrj6Hh23DCQ07E0y7XoNTPAwdH98E5WlAmcUbrPGbJ-W9i_zE7jPjUqwzoUHC0kT3sMONJFk7_tk-eAcK7mdrh5fB3DpydmGxxg4JVDmQxxMCYuvSHknccoWYpDyowVrfS1_KGnQW_SqZcxcIA7lH08yFYu79cmnq_Za5qBlZRJ0C-Qk3RKUrbAfLCSuhDQRLMgYXPlh9cOk2AfFiej8_hre8B7ak__IoqfPk-Y4C-wof_yb9Hq1Fr7iayqJsU7YOLTEYuBe-0Og_XDm5doLjn90Fs1gqNdMiVfdfovzc6IGczQ16n_ay5oLL6JaPsykpyPqwx_cOIbHVGuafzeDlP3OB5OYLBk3Z6JlfXNCwRJCA2_nY2skZF0mnhfvSNICa7melC3pMj3QYOxEZKImhVAToFXli0ksE9Qie0YDBs1bGqa4xidS3HlGHwHpHnEZ9XI8tl0mAhUrkpbBU37NFlFDfr1gzG1s5NqeDzqImuFhe1O5yXCDS59VqC2o-4zFF3SxXlM3LtJpkscHRRTr19aIj92Uk0hPbp15ir8zQnS08';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    console.log('Received request body:', body);

    const { email } = body;

    if (!email) {
      console.error('Email is missing from request');
      return new Response(JSON.stringify({ error: 'Email is required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    console.log('Sending request to MailerLite API for email:', email);

    // Add subscriber to MailerLite
    const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${MAILERLITE_API_TOKEN}`
      },
      body: JSON.stringify({
        email: email,
        status: 'active'
      })
    });

    const data = await response.json();
    console.log('MailerLite API response:', data);

    if (!response.ok) {
      console.error('MailerLite API error:', {
        status: response.status,
        data: data
      });
      return new Response(JSON.stringify({ 
        error: data.message || 'Failed to subscribe',
        details: data
      }), {
        status: response.status,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    return new Response(JSON.stringify({ 
      success: true,
      data: data
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error('Newsletter signup error:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Internal server error',
      details: error
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
