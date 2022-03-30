<?php

namespace App\Models\Utils;

class Keys
{
    // COMMON
    public const DATABASE_ID = 'id';
    public const DATABASE_CREATED_AT = 'created_at';
    public const DATABASE_UPDATED_AT = 'updated_at';
    public const DATABASE_DELETED_AT = 'deleted_at';

//    public const DATABASE_DATA_ID = 'data_id';
    public const DATABASE_DATA_KEY = 'data_key';
    public const DATABASE_DATA_COLUMN = 'data_column';


    // USER
    public const DATABASE_LOGIN = 'login';
    public const DATABASE_PASSWORD = 'password';
    public const DATABASE_ROLE = 'role_id';
    public const DATABASE_JOB = 'job';

    // USER DATA
    public const DATABASE_USER_DATA_ID = 'userData_id';
    public const DATABASE_USER_DATA_USER_ID = 'userData_userId';
    public const DATABASE_USER_DATA_KEY = 'userData_key';
    public const DATABASE_USER_DATA_COLUMN = 'userData_column';

    // SITE
    public const DATABASE_SITE_ID = 'site_id';
    public const DATABASE_SITE_NUMBER_SITE = 'site_number_site';
    public const DATABASE_SITE_DATE_START = 'site_date_start';
    public const DATABASE_SITE_DATE_END = 'site_date_end';

    // SITE DATA
    public const DATABASE_SITE_DATA_ID = 'siteData_id';
    public const DATABASE_SITE_DATA_SITE_ID = 'siteData_siteId';
    public const DATABASE_SITE_DATA_KEY = 'siteData_key';
    public const DATABASE_SITE_DATA_COLUMN = 'siteData_column';
    // TICKET
    public const DATABASE_TICKET_ID = 'problem_id';
    public const DATABASE_TICKET_REF = 'problem_ref';

    // TICKET DATA
    public const DATABASE_TICKET_DATA_ID = 'problemData_id';
    public const DATABASE_TICKET_DATA_TICKET_ID = 'problemData_problemId';
    public const DATABASE_TICKET_DATA_KEY = 'problemData_key';
    public const DATABASE_TICKET_DATA_COLUMN = 'problemData_column';

    // MATERIAL
    public const DATABASE_MATERIAL_ID = 'material_id';
    public const DATABASE_MATERIAL_REF = 'material_ref';

    // MATERIAL DATA
    public const DATABASE_MATERIAL_DATA_ID = 'materialData_id';
    public const DATABASE_MATERIAL_DATA_MATERIAL_ID = 'materialData_materialId';

    // TASK
    public const DATABASE_TASK_ID = 'task_id';
    public const DATABASE_TASK_NAME = 'task_name';
    public const DATABASE_TASK_DATE_START = 'task_date_start';
    public const DATABASE_TASK_DATE_END = 'task_date_end';

    // TASK DATA
    public const DATABASE_TASK_DATA_TASK_ID = 'data_task_id';
}
