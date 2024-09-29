@extends('frontend.user.layouts.dash')
@section('section', lang('User', 'user'))
@section('title', lang('My Files', 'files'))
@section('upload', true)
@section('search', true)
@section('content')
    @if ($fileEntries->count() > 0)
        <div class="filemanager-actions">
            <div class="form-check p-0" data-select="{{ lang('Select All', 'files') }}"
                data-unselect="{{ lang('Unselect All', 'files') }}">
                <input id="selectAll" type="checkbox" class="d-none filemanager-select-all" />
                <label type="checkbox" class="btn btn-secondary btn-md"
                    for="selectAll">{{ lang('Select All', 'files') }}</label>
            </div>
            <form action="{{ route('user.files.delete.all') }}" method="POST">
                @csrf
                <input id="filesSelectedInput" name="ids" value="" hidden />
                <button class="btn btn-danger btn-md confirm-action-form"><i
                        class="fa fa-trash-alt me-2"></i>{{ lang('Deleted Selected Files', 'files') }}</button>
            </form>
        </div>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-xxl-5 g-3 mb-4">
            @foreach ($fileEntries as $fileEntry)
                <div class="col-12">
                    <div class="filemanager-file">
                        <div class="filemanager-file-actions">
                            <div class="form-check">
                                <input id="{{ $fileEntry->shared_id }}" type="checkbox" class="form-check-input" />
                            </div>
                            <div class="dropdown">
                                <a class="" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown">
                                    <i class="fa fa-cog"></i>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end dash-dropdown-menu dropdown-menu-lg"
                                    aria-labelledby="dropdownMenuButton">
                                    @if ($fileEntry->access_status)
                                        <li>
                                            <a href="#" class="dropdown-item fileManager-share-file"
                                                data-preview="{{ isFileSupportPreview($fileEntry->type) ? 'true' : 'false' }}"
                                                data-share='{"filename":"{{ $fileEntry->name }}","download_link":"{{ route('file.download', $fileEntry->shared_id) }}","preview_link":"{{ route('file.preview', $fileEntry->shared_id) }}"}'><i
                                                    class="fas fa-share-alt me-2"></i>{{ lang('Share', 'files') }}</a>
                                        </li>
                                    @endif
                                    @if (isFileSupportPreview($fileEntry->type))
                                        <li>
                                            <a class="dropdown-item"
                                                href="{{ route('file.preview', $fileEntry->shared_id) }}"
                                                target="_blank"><i
                                                    class="fa fa-eye me-2"></i>{{ lang('Preview', 'files') }}</a>
                                        </li>
                                    @endif
                                    <li>
                                        <a class="dropdown-item" href="{{ route('file.download', $fileEntry->shared_id) }}"
                                            target="_blank"><i
                                                class="fa fa-download me-2"></i>{{ lang('Download', 'files') }}</a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item"
                                            href="{{ route('user.files.edit', $fileEntry->shared_id) }}"><i
                                                class="fa fa-edit me-2"></i>{{ lang('Edit details', 'files') }}</a>
                                    </li>
                                    <li>
                                        <form action="{{ route('user.files.delete', $fileEntry->shared_id) }}"
                                            method="POST">
                                            @csrf
                                            @method('DELETE')
                                            <button class="dropdown-item text-danger confirm-action-form"><i
                                                    class="fa fa-trash-alt me-2"></i>{{ lang('Delete', 'files') }}</button>
                                        </form>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <a href="{{ route('user.files.edit', $fileEntry->shared_id) }}"
                            class="filemanager-file-icon filemanager-link">
                            @if ($fileEntry->type == 'image')
                                <img src="{{ route('secure.file', hashid($fileEntry->id)) }}"
                                    alt="{{ $fileEntry->name }}">
                            @else
                                {!! fileIcon($fileEntry->extension, 'vi-lg') !!}
                            @endif
                        </a>
                        <a href="{{ route('user.files.edit', $fileEntry->shared_id) }}"
                            class="filemanager-file-title filemanager-link">{{ $fileEntry->name }}</a>
                        <p class="filemanager-file-meta mb-0">{{ formatBytes($fileEntry->size) }}</p>
                        <p class="filemanager-file-meta mb-0">{{ vDate($fileEntry->created_at) }}</p>
                    </div>
                </div>
            @endforeach
        </div>
        {{ $fileEntries->links() }}
        <div id="shareModal" class="modal fade share-modal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <form class="modal-content">
                    <div class="modal-header border-0 pb-0">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body p-4 pt-1 mb-1">
                        <h5 class="mb-4"><i class="fas fa-share-alt me-2"></i>{{ lang('Share this file') }}</h5>
                        <p class="mb-4 text-ellipsis filename"></p>
                        <div class="mb-3">
                            <div class="share"></div>
                        </div>
                        <div class="preview-link mb-3">
                            <label class="form-label"><strong>{{ lang('Preview link') }}</strong></label>
                            <div class="input-group">
                                <input id="copy-preview-link" type="text" class="form-control" value="" readonly>
                                <button type="button" class="btn btn-primary btn-md copy"
                                    data-clipboard-target="#copy-preview-link"><i class="far fa-clone"></i></button>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label"><strong>{{ lang('Download link') }}</strong></label>
                            <div class="input-group">
                                <input id="copy-download-link" type="text" class="form-control" value="ddd" readonly>
                                <button type="button" class="btn btn-primary btn-md copy"
                                    data-clipboard-target="#copy-download-link"><i class="far fa-clone"></i></button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    @else
        @include('frontend.user.includes.empty')
    @endif
@endsection
