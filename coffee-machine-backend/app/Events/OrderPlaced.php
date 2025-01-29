<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Models\Order;

class OrderPlaced implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    public function __construct(Public Order $order)
    {
        $this->order = $order;
    }
    public function broadcastOn() : Channel
    {
        return new Channel('orders');
    }
    public function broadcastAs()
    {
        return 'order.placed';
    }
    public function broadcastWith()
    {
        return [
            'order' => $this->order,
        ];
    }
}
