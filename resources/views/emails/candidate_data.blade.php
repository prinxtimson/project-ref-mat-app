<x-mail::message>
# Request for Access to Personal Data – Confirmation

Dear {{$name}},

We have received your request for access to your personal data. Your request has been processed, and the data is attached/enclosed with this email. If you have any further questions, please do not hesitate to contact us.

@component('mail::panel')
# Firstname: {{$user['profile']['firstname']}}
# Lastname: {{$user['profile']['lastname']}}
# Email: {{$user['email']}}
# Phone Number: {{$user['profile']['phone_number']}}
@endcomponent

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
