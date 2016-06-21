<?php

namespace App\Presenters;

use Nette\Utils\Strings;

class TaskPresenter extends BasePresenter
{
	public function getJsFilenames()
	{
		$jsFilenames = [
			'vendor/math.min',
			'vendor/colorsys',
			'point',
			'vector',
			'line',
			'circle',
			'triangle',
			'polygon',
			'text',
			'bitmap-image',
			'vector-image',
			'turtle',
			'lSystem',
			'matrix',
			'transformation',
			'active-edge-list',
			'delaunay-triangulation',
			'voronoi-diagram',
			Strings::webalize($this->action),
		];

		return array_merge(parent::getJsFilenames(), $jsFilenames);
	}
}
