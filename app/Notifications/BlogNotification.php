<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class BlogNotification extends Notification
{
    use Queueable;
    public $comment;
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($comment)
    {
        $this->comment=$comment;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail','database'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $url=url('/'.$this->comment->blog->slug);
        
        return (new MailMessage)
                    ->greeting('Merhabalar. Web Developer(Mükremin Biçer)')
                    ->line('Bloğunuza yorum yapıldı')
                    ->action('Blogu Gör',$url)
                    ->line('Teşekkür ederiz bizi tercih ettiğiniz için!');
    }
    public function toDatabase($notifiable)
    {
        return [
            'description'=>$this->comment->description,
            'user'=>$this->comment->user->id
        ];
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}