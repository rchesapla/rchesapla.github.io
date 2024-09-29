<?php

namespace App\Http\Controllers\Frontend\User;

use App\Http\Controllers\Controller;
use App\Models\FileEntry;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $totalFiles = FileEntry::currentUser()->notExpired()->count();
        $totalDownloads = FileEntry::currentUser()->notExpired()->sum('downloads');
        $totalViews = FileEntry::currentUser()->notExpired()->sum('views');
        return view('frontend.user.dashboard.index', [
            'totalFiles' => $totalFiles,
            'totalDownloads' => $totalDownloads,
            'totalViews' => $totalViews,
        ]);
    }

    public function uploadsChart()
    {
        $startDate = Carbon::now()->startOfMonth();
        $endDate = Carbon::now()->endOfMonth();
        $dates = chartDates($startDate, $endDate);
        $monthlyUploads = FileEntry::currentUser()->where('created_at', '>=', Carbon::now()->startOfMonth())
            ->notExpired()
            ->selectRaw('DATE(created_at) as date, COUNT(*) as count')
            ->groupBy('date')
            ->pluck('count', 'date');
        $monthlyUploadsData = $dates->merge($monthlyUploads);
        $uploadsChartLabels = [];
        $uploadsChartData = [];
        foreach ($monthlyUploadsData as $key => $value) {
            $uploadsChartLabels[] = Carbon::parse($key)->format('d F');
            $uploadsChartData[] = $value;
        }
        $suggestedMax = (max($uploadsChartData) > 9) ? max($uploadsChartData) + 2 : 10;
        return ['uploadsChartLabels' => $uploadsChartLabels, 'uploadsChartData' => $uploadsChartData, 'suggestedMax' => $suggestedMax];
    }
}
