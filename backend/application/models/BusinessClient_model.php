<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class BusinessClient_model extends CI_Model {

	public function __construct() {
		parent::__construct();
		$this->load->database();
	}

	public function get_business_client($id) {
		$this->db->from('Business_Client');
		$this->db->where('id',$id);
		$this->db->limit(1);
		return $this->db->get()->row();
	}
}



