<?php

namespace App\Presenters;

class TaskPresenter extends BasePresenter
{
	public function getJsFilenames()
	{
		$jsFilenames = [
			'point',
			'vector',
			'line',
			'circle',
			'polygon',
			'bitmapImage',
			'vectorImage',
			'turtle',
			$this->action,
		];

		return array_merge(parent::getJsFilenames(), $jsFilenames);
	}
}
