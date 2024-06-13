<x-mail::message>
# Two Factor Authentication

Hi {{ $name }},

You are receiving this email because you initiated a login attempt on Tritek. Your Two-Factor Authentication code is: # {{$code}} 

Please enter this code on the login page to complete the authentication process.

If you did not initiate this login attempt, please disregard this email. 

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
