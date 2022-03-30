<?php

namespace App\Models\Utils;

use DateTime;

class Functions
{

    /**
     * Return un objet DateTime depuis un Timestamp donnée ($value)
     * @param int $value
     * @return DateTime|null
     *
     */
    public static function fromUnix( int $value ): ?\DateTime {
        $myDateTime = new DateTime();
        $myDateTime = $myDateTime->setTimestamp( $value );
        if ($myDateTime != false) {
            return $myDateTime;
        }
        return null;
    }

    public static function fromString( string $value ): ?DateTime {
        $format = 'Y-m-d H:i:s';
        $myDateTime = DateTime::createFromFormat($format, $value);
        if ($myDateTime !== false) {
            return $myDateTime;
        }
        return null;
    }
}
