<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class BusinessClient extends CI_Controller {


	public function __construct() {
	
		parent::__construct();

	}


	public function getBusinessClient($id) {

		$this->load->model('BusinessClient_model');

		$client = $this->BusinessClient_model->get_business_client($id);

		print_r($client);

	}
}
