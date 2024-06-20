<x-mail::message>
# DATA SUBJECT ACCESS

Here is the breakdown of the personal data that Tritek holds on the the LMS reference platform.

@component('mail::panel')
# Firstname: {{$user['profile']['firstname']}}
# Lastname: {{$user['profile']['lastname']}}
# Email: {{$user['email']}}
# Phone Number: {{$user['profile']['phone_number']}}
@endcomponent

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
